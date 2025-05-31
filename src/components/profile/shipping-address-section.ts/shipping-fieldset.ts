import { type AddressType, updateInputName } from '../../../helpers/update-input-name';
import type { WrappedInput } from '../../../shared/components/input';
import {
  createDiv,
  createFieldset,
  createLegend,
  createOption,
  createSelect,
} from '../../../utils/create-elements/create-tags';
import { createAddressInputWithoutType } from '../../registration/input';
import { countryOptions, PROFILE_CLASSES } from '../constants';
import { SHIPPING_ADDRESS_CONFIG } from './constants';

type AddressBlock = {
  fieldset: HTMLFieldSetElement;
  inputs: WrappedInput[];
  select: HTMLSelectElement;
};

export function createCountrySelect(addressType: AddressType): HTMLSelectElement {
  const select = createSelect(SHIPPING_ADDRESS_CONFIG.countries);
  const options = Object.values(countryOptions).map((element) => createOption(element));
  select.append(...options);
  updateInputName(select, addressType);
  return select;
}

export function createShippingFieldset(): AddressBlock {
  const title = createLegend({ text: 'Default shipping address' });

  const countriesSelect = createCountrySelect('shipping');
  const cityInput = createAddressInputWithoutType(SHIPPING_ADDRESS_CONFIG.city);
  const postalCodeInput = createAddressInputWithoutType(SHIPPING_ADDRESS_CONFIG.postalcode);
  const streetInput = createAddressInputWithoutType(SHIPPING_ADDRESS_CONFIG.street);

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
