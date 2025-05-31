import { getUserInfo } from '../../../app/api';
import { getAuthToken } from '../../../app/ecommerce/get-auth-token';
import type { FetchError } from '../../../app/types';
import {
  createButton,
  createDiv,
  createFieldset,
  createLegend,
  createOption,
  createSelect,
} from '../../../utils/create-elements/create-tags';
import { createAddressInputWithoutType } from '../../registration/input';
import { countryOptions } from '../../../pages/registration/constants';
import { type AddressType, updateInputName } from '../../../helpers/update-input-name';
import { ADDRESS_CONFIG, DEFAULT_ADDRESS_BUTTONS_CONFIG } from './constants';
import { PROFILE_CLASSES } from '../constants';
import { updateShippingAddressEmitter } from '../../../helpers/update-personal-data-emitter';
import { activateButtonEmitter, defaultShippingAddressEmitter } from '../../../helpers/buttons-emitter';
import type { WrappedInput } from '../../../shared/components/input';
import { updateShippingAddressState } from '../../../utils/update-default-shipping-state';

type AddressBlock = {
  fieldset: HTMLFieldSetElement;
  inputs: WrappedInput[];
  select: HTMLSelectElement;
};

export function createCountrySelect(addressType: AddressType): HTMLSelectElement {
  const select = createSelect(ADDRESS_CONFIG.countries);
  const options = Object.values(countryOptions).map((element) => createOption(element));
  select.append(...options);
  updateInputName(select, addressType);
  return select;
}

function createShippingAddressBlock(blockTitle: string, addressType: 'billing' | 'shipping'): AddressBlock {
  const title = createLegend({ text: blockTitle });

  const countriesSelect = createCountrySelect(addressType);
  const cityInput = createAddressInputWithoutType(ADDRESS_CONFIG.city);
  const postalCodeInput = createAddressInputWithoutType(ADDRESS_CONFIG.postalcode);
  const streetInput = createAddressInputWithoutType(ADDRESS_CONFIG.street);

  const inputsContainer = createDiv({
    children: [countriesSelect, cityInput.container, postalCodeInput.container, streetInput.container],
    classes: PROFILE_CLASSES.inputsContainer,
  });

  return {
    fieldset: createFieldset({ children: [title, inputsContainer], classes: PROFILE_CLASSES.addressBlock }),
    inputs: [cityInput, streetInput, postalCodeInput],
    select: countriesSelect,
  };
}

// eslint-disable-next-line max-lines-per-function
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

  const shippingAddressBlock = createShippingAddressBlock('Default shipping address', 'shipping');

  const [cityWrapper, streetNameWrapper, postalCodeWrapper] = shippingAddressBlock.inputs;
  const country = shippingAddressBlock.select;

  const addresses = user.addresses;
  const shippingAddress = addresses.find((add) => add.id === user.defaultShippingAddressId);
  const shippingAddressID = shippingAddress?.id || undefined;

  if (shippingAddressID) {
    updateShippingAddressState(shippingAddress);
    console.log(shippingAddress);
  }

  // updateDefaultShippingState(shippingAddress);
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
