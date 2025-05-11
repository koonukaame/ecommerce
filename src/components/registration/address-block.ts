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

  const clonedContainer = inputs.map((container) => {
    const clonedElement = container.cloneNode(true);
    if (!(clonedElement instanceof HTMLElement)) {
      throw new TypeError('Cloned node is not an HTMLElement');
    }

    const input = clonedElement.querySelector('input');
    if (input) {
      const originalName = input.getAttribute('name');
      input.setAttribute('name', `${originalName}-${addressName}`);
    }
    if (clonedElement instanceof HTMLSelectElement) {
      const originalName = clonedElement.getAttribute('name');
      clonedElement.setAttribute('name', `${originalName}-${addressName}`);
    }

    return clonedElement;
  });

  const inputsContainer = createDiv({ children: clonedContainer, classes: REGISTRATION.inputsContainer });

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
