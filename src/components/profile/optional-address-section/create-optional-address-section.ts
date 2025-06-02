import type { FetchError } from '../../../app/types';
import { createButton, createDiv } from '../../../utils/create-elements/create-tags';
import { PROFILE_CLASSES } from '../constants';
import {
  optionalShippingEmitterAsync,
  optionalBillingEmitterAsync,
  updateAddressEmitter,
} from '../../../helpers/update-personal-data-emitter';
import {
  activateButtonEmitter,
  firstOptionalAddressEmitter,
  secondOptionalAddressEmitter,
} from '../../../helpers/buttons-emitter';
import { updateAddressState } from '../../../utils/update-address-state';
import { optionalShippingState } from '../../../app/state/profile/optional-shipping-state';
import { createFieldsetComponent } from '../fieldset';
import { OPTIONAL_SHIPPING_BUTTONS_CONFIG, OPTIONAL_SHIPPING_CONFIG } from './optional-shipping-constants';
import { OPTIONAL_BILLING_BUTTONS_CONFIG, OPTIONAL_BILLING_CONFIG } from './optional-billing-constants';
import { getAuthorizedUser } from '../../../helpers/get-authorized-user';
import { optionalBillingState } from '../../../app/state/profile/optional-billing-state';

type AddressType = 'optional-shipping' | 'optional-billing';

export async function createOptionalAddressSection(type: AddressType): Promise<FetchError | HTMLDivElement | void> {
  const user = await getAuthorizedUser();
  if (!('id' in user)) {
    return { message: 'Failed to get Personal Data' };
  }

  const isShipping = type === 'optional-shipping';
  const CONFIG = isShipping ? OPTIONAL_SHIPPING_CONFIG : OPTIONAL_BILLING_CONFIG;
  const BUTTONS_CONFIG = isShipping ? OPTIONAL_SHIPPING_BUTTONS_CONFIG : OPTIONAL_BILLING_BUTTONS_CONFIG;
  const emitter = isShipping ? firstOptionalAddressEmitter : secondOptionalAddressEmitter;
  const updateEmitter = isShipping ? optionalShippingEmitterAsync : optionalBillingEmitterAsync;

  const optionalAddressBlock = createFieldsetComponent(CONFIG, `Additional ${type.split('-')[1]} address`);
  const [cityWrapper, streetNameWrapper, postalCodeWrapper] = optionalAddressBlock.inputs;
  const country = optionalAddressBlock.select;
  const addresses = isShipping ? user.shippingAddressIds : user.billingAddressIds;
  if (!addresses) {
    return;
  }
  const optionalAddressID = addresses.find(
    (address) => address !== user.defaultShippingAddressId && address !== user.defaultBillingAddressId,
  );
  const optionalAddress = user.addresses.find((address) => address.id === optionalAddressID);
  if (optionalAddress && optionalAddressID) {
    if (isShipping) {
      updateAddressState(optionalShippingState, optionalAddress);
    } else {
      updateAddressState(optionalBillingState, optionalAddress);
    }
  }
  country.value = optionalAddress?.country || '';
  cityWrapper.input.value = optionalAddress?.city || '';
  streetNameWrapper.input.value = optionalAddress?.streetName || '';
  postalCodeWrapper.input.value = optionalAddress?.postalCode || '';
  const editButton = createButton(BUTTONS_CONFIG.edit);
  const saveButton = createButton(BUTTONS_CONFIG.save);
  const cancelButton = createButton(BUTTONS_CONFIG.cancel);
  const buttons = [editButton, saveButton, cancelButton];

  const inputWrappers = [...optionalAddressBlock.inputs];
  const inputs = inputWrappers.map((inputWrapper) => inputWrapper.input);
  const countrySelect = optionalAddressBlock.select;
  activateButtonEmitter(emitter, buttons, inputWrappers, countrySelect);
  updateAddressEmitter(type, updateEmitter, inputs, countrySelect, optionalAddressID);

  return createDiv({
    classes: PROFILE_CLASSES.section,
    children: [optionalAddressBlock.fieldset, ...buttons],
  });
}
