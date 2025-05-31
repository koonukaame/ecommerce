import { getUserInfo } from '../../../app/api';
import { getAuthToken } from '../../../app/ecommerce/get-auth-token';
import type { FetchError } from '../../../app/types';
import { createButton, createDiv } from '../../../utils/create-elements/create-tags';
import { DEFAULT_ADDRESS_BUTTONS_CONFIG } from './constants';
import { PROFILE_CLASSES } from '../constants';
import { updateBillingAddressEmitter } from '../../../helpers/update-personal-data-emitter';
import { activateButtonEmitter, defaultBillingAddressEmitter } from '../../../helpers/buttons-emitter';
import { updateAddressState } from '../../../utils/update-address-state';
import { createShippingFieldset } from './billing-fieldset';
import { billingAddressState } from '../../../app/state/profile/default-billing-state';

export async function createBillingAddressSection(): Promise<FetchError | HTMLDivElement> {
  //! Delete in the future when I save token in local/session storage
  const token = await getAuthToken('ivanIvanov@yandex.ru', 'Ivan12345');
  if (typeof token !== 'string') {
    return { message: 'Failed to get token' };
  }

  const user = await getUserInfo(token);
  if (!('id' in user)) {
    return { message: 'Failed to get Personal Data' };
  }

  const billingAddressBlock = createShippingFieldset();

  const [cityWrapper, streetNameWrapper, postalCodeWrapper] = billingAddressBlock.inputs;
  const country = billingAddressBlock.select;

  const addresses = user.addresses;
  const billingAddress = addresses.find((add) => add.id === user.defaultBillingAddressId);
  const billingAddressID = billingAddress?.id || undefined;
  if (billingAddress && billingAddressID) {
    updateAddressState(billingAddressState, billingAddress);
  }

  country.value = billingAddress?.country || '';
  cityWrapper.input.value = billingAddress?.city || '';
  streetNameWrapper.input.value = billingAddress?.streetName || '';
  postalCodeWrapper.input.value = billingAddress?.postalCode || '';

  const editButton = createButton(DEFAULT_ADDRESS_BUTTONS_CONFIG.edit);
  const saveButton = createButton(DEFAULT_ADDRESS_BUTTONS_CONFIG.save);
  const cancelButton = createButton(DEFAULT_ADDRESS_BUTTONS_CONFIG.cancel);
  const buttons = [editButton, saveButton, cancelButton];

  const inputWrappers = [...billingAddressBlock.inputs];
  const inputs = inputWrappers.map((inputWrapper) => inputWrapper.input);
  const countrySelect = billingAddressBlock.select;

  activateButtonEmitter(defaultBillingAddressEmitter, buttons, inputWrappers, countrySelect);
  updateBillingAddressEmitter(inputs, countrySelect, billingAddressID);

  const defaultAddressesSection = createDiv({
    classes: PROFILE_CLASSES.section,
    children: [billingAddressBlock.fieldset, ...buttons],
  });

  return defaultAddressesSection;
}
