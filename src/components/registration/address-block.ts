import { emitAdressInputs, subscribeToAddressInputs } from '../../helpers/address-emitter';
import { REGISTRATION } from '../../pages/registration/constants';
import { createCheckboxLabel } from '../../shared/components/checkbox';
import { createDiv, createFieldset, createLegend } from '../../utils/create-elements/create-tags';
import { createAddressInput, REGISTRATION_INPUTS_CONFIG } from './input';
import { createCountrySelect } from './select';

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

  emitAdressInputs(cityInput, postalCodeInput, streetInput, countriesSelect, addressType);
  subscribeToAddressInputs(cityInput, postalCodeInput, streetInput, countriesSelect, addressType);

  const inputsContainer = createDiv({
    children: [countriesSelect, cityInput.container, postalCodeInput.container, streetInput.container],
    classes: REGISTRATION.inputsContainer,
  });

  const checkboxContainer = createCheckboxLabel(defaultAddressCheckbox, 'Set as default address');

  return createFieldset({ children: [title, checkboxContainer, inputsContainer], classes: REGISTRATION.addressBlock });
}
