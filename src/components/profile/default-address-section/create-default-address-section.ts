import { defaultBillingState } from '../../../app/state/profile/default-billing-state';
import { defaultShippingState } from '../../../app/state/profile/default-shipping-state';
import type { FetchError } from '../../../app/types';
import {
  defaultShippingAddressEmitter,
  defaultBillingAddressEmitter,
  activateButtonEmitter,
} from '../../../helpers/buttons-emitter';
import { getAuthorizedUser } from '../../../helpers/get-authorized-user';
import {
  defaultShippingEmitterAsync,
  defaultBillingEmitterAsync,
  updateAddressEmitter,
} from '../../../helpers/update-personal-data-emitter';
import { createButton, createDiv } from '../../../utils/create-elements/create-tags';
import { updateAddressState } from '../../../utils/update-address-state';
import { PROFILE_CLASSES } from '../constants';
import { createFieldsetComponent } from '../fieldset';
import { DEFAULT_BILLING_CONFIG, DEFAULT_BILLING_BUTTONS_CONFIG } from './billing-constants';
import { DEFAULT_SHIPPING_CONFIG, DEFAULT_SHIPPING_BUTTONS_CONFIG } from './shipping-constants';

type AddressType = 'shipping' | 'billing';

// eslint-disable-next-line max-lines-per-function
export async function createDefaultAddressSection(type: AddressType): Promise<FetchError | HTMLDivElement> {
  const user = await getAuthorizedUser();
  if (!('id' in user)) {
    return { message: 'Failed to get Personal Data' };
  }

  const isShipping = type === 'shipping';
  const CONFIG = isShipping ? DEFAULT_SHIPPING_CONFIG : DEFAULT_BILLING_CONFIG;
  const BUTTONS_CONFIG = isShipping ? DEFAULT_SHIPPING_BUTTONS_CONFIG : DEFAULT_BILLING_BUTTONS_CONFIG;
  const title = `Default ${type} address`;
  const addressBlock = createFieldsetComponent(CONFIG, title);
  const [cityWrapper, streetNameWrapper, postalCodeWrapper] = addressBlock.inputs;
  const country = addressBlock.select;
  const defaultAddressId = type === 'shipping' ? user.defaultShippingAddressId : user.defaultBillingAddressId;
  const address = user.addresses.find((address) => address.id === defaultAddressId);
  const addressID = address?.id || undefined;

  if (address && addressID) {
    if (isShipping) {
      updateAddressState(defaultShippingState, address);
    } else {
      updateAddressState(defaultBillingState, address);
    }
  }

  country.value = address?.country || '';
  cityWrapper.input.value = address?.city || '';
  streetNameWrapper.input.value = address?.streetName || '';
  postalCodeWrapper.input.value = address?.postalCode || '';

  const editButton = createButton(BUTTONS_CONFIG.edit);
  const saveButton = createButton(BUTTONS_CONFIG.save);
  const cancelButton = createButton(BUTTONS_CONFIG.cancel);

  const buttons = [editButton, saveButton, cancelButton];

  if (BUTTONS_CONFIG.remove) {
    const removeButton = createButton(BUTTONS_CONFIG.remove);
    buttons.push(removeButton);
  }

  const inputWrappers = [...addressBlock.inputs];
  const inputs = inputWrappers.map((wrapper) => wrapper.input);
  const select = addressBlock.select;

  const emitter = isShipping ? defaultShippingAddressEmitter : defaultBillingAddressEmitter;
  const updateEmitter = isShipping ? defaultShippingEmitterAsync : defaultBillingEmitterAsync;

  activateButtonEmitter(emitter, buttons, inputWrappers, select);
  updateAddressEmitter(type, updateEmitter, inputs, select, addressID);

  return createDiv({
    classes: PROFILE_CLASSES.section,
    children: [addressBlock.fieldset, ...buttons],
  });
}
