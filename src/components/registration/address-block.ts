import { REGISTRATION } from '../../pages/registration/constants';
import { createCheckboxLabel } from '../../shared/components/checkbox';
import { createCountrySelect } from '../../shared/components/select';
import { createDiv, createFieldset, createLegend } from '../../utils/create-elements/create-tags';
import { createAddressInput, REGISTRATION_INPUTS_CONFIG } from './input';

export function createAddressBlock(
  blockTitle: string,
  defaultAddressCheckbox: HTMLElement,
  addressType: 'billing' | 'shipping',
): HTMLFieldSetElement {
  const title = createLegend({ text: blockTitle });

  const cityInput = createAddressInput(REGISTRATION_INPUTS_CONFIG.city, addressType);
  const postalCodeInput = createAddressInput(REGISTRATION_INPUTS_CONFIG.postalcode, addressType);
  const streetInput = createAddressInput(REGISTRATION_INPUTS_CONFIG.street, addressType);
  const countriesSelect = createCountrySelect(addressType);

  const inputsContainer = createDiv({
    children: [countriesSelect, cityInput.container, postalCodeInput.container, streetInput.container],
    classes: REGISTRATION.inputsContainer,
  });

  const checkboxContainer = createCheckboxLabel(defaultAddressCheckbox, 'Set as default address');

  return createFieldset({ children: [title, checkboxContainer, inputsContainer], classes: REGISTRATION.addressBlock });
}
