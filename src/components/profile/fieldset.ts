import { countryOptions } from '../../helpers/country-options';
import type { WrappedInput } from '../../shared/components/input';
import {
  createSelect,
  createOption,
  createLegend,
  createDiv,
  createFieldset,
} from '../../utils/create-elements/create-tags';
import { createAddressInputWithoutType } from '../registration/input';
import { PROFILE_CLASSES } from './constants';

type AddressBlock = {
  fieldset: HTMLFieldSetElement;
  inputs: WrappedInput[];
  select: HTMLSelectElement;
};

type AddressFieldConfig = {
  attributes: Record<string, string>;
  classes: string[];
  events: Record<string, (event: Event) => void>;
};

type AddressConfig = {
  countries: AddressFieldConfig;
  city: AddressFieldConfig;
  postalcode: AddressFieldConfig;
  street: AddressFieldConfig;
};

export function createCountrySelect(addressConfig: AddressConfig): HTMLSelectElement {
  const select = createSelect(addressConfig.countries);
  const options = Object.values(countryOptions).map((element) => createOption(element));
  select.append(...options);
  return select;
}

export function createFieldsetComponent(addressConfig: AddressConfig, legendTitle: string): AddressBlock {
  const title = createLegend({ text: legendTitle });

  const countriesSelect = createCountrySelect(addressConfig);
  const cityInput = createAddressInputWithoutType(addressConfig.city);
  const postalCodeInput = createAddressInputWithoutType(addressConfig.postalcode);
  const streetInput = createAddressInputWithoutType(addressConfig.street);

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
