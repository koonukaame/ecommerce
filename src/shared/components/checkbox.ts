import { createDiv, createLabel } from '../../utils/create-elements/create-tags';
import { CHECKBOX } from '../styles';

export function createCheckboxLabel(checkbox: HTMLElement, labelText: string): HTMLDivElement {
  const label = createLabel({
    attributes: { for: checkbox.getAttribute('id') || '' },
    text: labelText,
  });

  return createDiv({
    children: [checkbox, label],
    classes: CHECKBOX.general,
  });
}
