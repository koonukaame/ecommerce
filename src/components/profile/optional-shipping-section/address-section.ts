import { getUserInfo } from '../../../app/api';
import { getAuthToken } from '../../../app/ecommerce/get-auth-token';
import type { FetchError } from '../../../app/types';
import { createButton, createDiv } from '../../../utils/create-elements/create-tags';
import { PROFILE_CLASSES } from '../constants';
import {
  firstOptionalAddressEmitterAsync,
  udpateDefaultAddressEmitter,
} from '../../../helpers/update-personal-data-emitter';
import { activateButtonEmitter, firstOptionalAddressEmitter } from '../../../helpers/buttons-emitter';
import { updateAddressState } from '../../../utils/update-address-state';
import { FIRST_OPTIONAL_ADDRESS_BUTTONS_CONFIG, FIRST_OPTIONAL_ADDRESS_CONFIG } from './constants';
import { optionalShippingState } from '../../../app/state/profile/optional-shipping-state';
import { createFieldsetComponent } from '../fieldset';

// eslint-disable-next-line max-lines-per-function
export async function createFirstOptionalAddressSection(): Promise<FetchError | HTMLDivElement | void> {
  //! Delete in the future when I save token in local/session storage
  const token = await getAuthToken('ivanIvanov@yandex.ru', 'Ivan12345');
  if (typeof token !== 'string') {
    return { message: 'Failed to get token' };
  }

  const user = await getUserInfo(token);
  if (!('id' in user)) {
    return { message: 'Failed to get Personal Data' };
  }

  const firstOptionalAddressBlock = createFieldsetComponent(
    FIRST_OPTIONAL_ADDRESS_CONFIG,
    'Additional shipping address',
  );

  const [cityWrapper, streetNameWrapper, postalCodeWrapper] = firstOptionalAddressBlock.inputs;
  const country = firstOptionalAddressBlock.select;

  const addresses = user.shippingAddressIds;

  if (!addresses) {
    return;
  }

  const firstOptionalAddressID = addresses.find((address) => address !== user.defaultShippingAddressId);
  const firstOptionalAddress = user.addresses.find((address) => address.id === firstOptionalAddressID);

  if (firstOptionalAddress && firstOptionalAddressID) {
    updateAddressState(optionalShippingState, firstOptionalAddress);
  }

  country.value = firstOptionalAddress?.country || '';
  cityWrapper.input.value = firstOptionalAddress?.city || '';
  streetNameWrapper.input.value = firstOptionalAddress?.streetName || '';
  postalCodeWrapper.input.value = firstOptionalAddress?.postalCode || '';

  const editButton = createButton(FIRST_OPTIONAL_ADDRESS_BUTTONS_CONFIG.edit);
  const saveButton = createButton(FIRST_OPTIONAL_ADDRESS_BUTTONS_CONFIG.save);
  const cancelButton = createButton(FIRST_OPTIONAL_ADDRESS_BUTTONS_CONFIG.cancel);
  const buttons = [editButton, saveButton, cancelButton];

  const inputWrappers = [...firstOptionalAddressBlock.inputs];
  const inputs = inputWrappers.map((inputWrapper) => inputWrapper.input);
  const countrySelect = firstOptionalAddressBlock.select;

  activateButtonEmitter(firstOptionalAddressEmitter, buttons, inputWrappers, countrySelect);
  udpateDefaultAddressEmitter(
    'optional-shipping',
    firstOptionalAddressEmitterAsync,
    inputs,
    countrySelect,
    firstOptionalAddressID,
  );

  const firstOptionalAddressSection = createDiv({
    classes: PROFILE_CLASSES.section,
    children: [firstOptionalAddressBlock.fieldset, ...buttons],
  });

  return firstOptionalAddressSection;
}
