import { billingAddressState } from '../../../app/state/profile/default-billing-state';
import { shippingAddressState } from '../../../app/state/profile/default-shipping-state';
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
  udpateDefaultAddressEmitter,
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

  const CONFIG = type === 'shipping' ? DEFAULT_SHIPPING_CONFIG : DEFAULT_BILLING_CONFIG;
  const BUTTONS_CONFIG = type === 'shipping' ? DEFAULT_SHIPPING_BUTTONS_CONFIG : DEFAULT_BILLING_BUTTONS_CONFIG;

  const title = `Default ${type} address`;
  const addressBlock = createFieldsetComponent(CONFIG, title);

  const [cityWrapper, streetNameWrapper, postalCodeWrapper] = addressBlock.inputs;
  const country = addressBlock.select;

  const defaultAddressId = type === 'shipping' ? user.defaultShippingAddressId : user.defaultBillingAddressId;
  const address = user.addresses.find((address) => address.id === defaultAddressId);
  const addressID = address?.id || undefined;

  if (address && addressID) {
    if (type === 'shipping') {
      updateAddressState(shippingAddressState, address);
    } else {
      updateAddressState(billingAddressState, address);
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

  const inputWrappers = [...addressBlock.inputs];
  const inputs = inputWrappers.map((wrapper) => wrapper.input);
  const select = addressBlock.select;

  const emitter = type === 'shipping' ? defaultShippingAddressEmitter : defaultBillingAddressEmitter;
  const updateEmitter = type === 'shipping' ? defaultShippingEmitterAsync : defaultBillingEmitterAsync;

  activateButtonEmitter(emitter, buttons, inputWrappers, select);
  udpateDefaultAddressEmitter(type, updateEmitter, inputs, select, addressID);

  return createDiv({
    classes: PROFILE_CLASSES.section,
    children: [addressBlock.fieldset, ...buttons],
  });
}
