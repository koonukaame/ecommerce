import { cloneInputs } from '../../helpers/clone-input';
import { REGISTRATION } from '../../pages/registration/constants';
import { CHECKBOX } from '../../shared/styles';
import { createDiv } from '../../utils/create-elements/create-tags';
import { createFieldset, createLabel, createLegend } from '../../utils/create-elements/create-tags';

export function createAddressBlock(
  blockTitle: string,
  inputs: HTMLElement[],
  defaultAddressCheckbox: HTMLElement,
  addressName: string,
): HTMLFieldSetElement {
  const title = createLegend({ text: blockTitle });

  const clonedInputs = cloneInputs(inputs, addressName);

  const inputsContainer = createDiv({ children: clonedInputs, classes: REGISTRATION.inputsContainer });

  const defaultCheckboxLabel = createLabel({
    attributes: { for: defaultAddressCheckbox.getAttribute('id') || '' },
    text: 'Set as default address',
  });
  const checkboxContainer = createDiv({
    children: [defaultAddressCheckbox, defaultCheckboxLabel],
    classes: CHECKBOX.general,
  });

  return createFieldset({ children: [title, checkboxContainer, inputsContainer], classes: REGISTRATION.addressBlock });
}
