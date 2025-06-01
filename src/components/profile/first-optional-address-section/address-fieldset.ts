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
import { FIRST_OPTIONAL_ADDRESS_CONFIG } from './constants';

type AddressBlock = {
  fieldset: HTMLFieldSetElement;
  inputs: WrappedInput[];
  select: HTMLSelectElement;
};

export function createCountrySelect(): HTMLSelectElement {
  const select = createSelect(FIRST_OPTIONAL_ADDRESS_CONFIG.countries);
  const options = Object.values(countryOptions).map((element) => createOption(element));
  select.append(...options);
  return select;
}

export function createOptionadlAddressFieldset(): AddressBlock {
  const title = createLegend({ text: 'Additional shipping address' });

  const countriesSelect = createCountrySelect();
  const cityInput = createAddressInputWithoutType(FIRST_OPTIONAL_ADDRESS_CONFIG.city);
  const postalCodeInput = createAddressInputWithoutType(FIRST_OPTIONAL_ADDRESS_CONFIG.postalcode);
  const streetInput = createAddressInputWithoutType(FIRST_OPTIONAL_ADDRESS_CONFIG.street);

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
