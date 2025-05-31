import { getUserInfo } from '../../../app/api';
import { getAuthToken } from '../../../app/ecommerce/get-auth-token';
import type { FetchError } from '../../../app/types';
import { createButton, createDiv } from '../../../utils/create-elements/create-tags';
import { DEFAULT_ADDRESS_BUTTONS_CONFIG } from './constants';
import { PROFILE_CLASSES } from '../constants';
import { updateShippingAddressEmitter } from '../../../helpers/update-personal-data-emitter';
import { activateButtonEmitter, defaultShippingAddressEmitter } from '../../../helpers/buttons-emitter';
import { updateAddressState } from '../../../utils/update-address-state';
import { createShippingFieldset } from './shipping-fieldset';
import { shippingAddressState } from '../../../app/state/profile/default-shipping-state';

export async function createShippingAddressSection(): Promise<FetchError | HTMLDivElement> {
  //! Delete in the future when I save token in local/session storage
  const token = await getAuthToken('ivanIvanov@yandex.ru', 'Ivan12345');
  if (typeof token !== 'string') {
    return { message: 'Failed to get token' };
  }

  const user = await getUserInfo(token);
  if (!('id' in user)) {
    return { message: 'Failed to get Personal Data' };
  }

  const shippingAddressBlock = createShippingFieldset();

  const [cityWrapper, streetNameWrapper, postalCodeWrapper] = shippingAddressBlock.inputs;
  const country = shippingAddressBlock.select;

  const addresses = user.addresses;
  const shippingAddress = addresses.find((add) => add.id === user.defaultShippingAddressId);
  const shippingAddressID = shippingAddress?.id || undefined;

  if (shippingAddress && shippingAddressID) {
    updateAddressState(shippingAddressState, shippingAddress);
  }

  country.value = shippingAddress?.country || '';
  cityWrapper.input.value = shippingAddress?.city || '';
  streetNameWrapper.input.value = shippingAddress?.streetName || '';
  postalCodeWrapper.input.value = shippingAddress?.postalCode || '';

  const editButton = createButton(DEFAULT_ADDRESS_BUTTONS_CONFIG.edit);
  const saveButton = createButton(DEFAULT_ADDRESS_BUTTONS_CONFIG.save);
  const cancelButton = createButton(DEFAULT_ADDRESS_BUTTONS_CONFIG.cancel);
  const buttons = [editButton, saveButton, cancelButton];

  const inputWrappers = [...shippingAddressBlock.inputs];
  const inputs = inputWrappers.map((inputWrapper) => inputWrapper.input);
  const countrySelect = shippingAddressBlock.select;

  activateButtonEmitter(defaultShippingAddressEmitter, buttons, inputWrappers, countrySelect);
  updateShippingAddressEmitter(inputs, countrySelect, shippingAddressID);

  const defaultAddressesSection = createDiv({
    classes: PROFILE_CLASSES.section,
    children: [shippingAddressBlock.fieldset, ...buttons],
  });

  return defaultAddressesSection;
}
