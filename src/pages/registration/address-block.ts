import { CHECKBOX } from "../../shared/styles";
import { createDiv } from "../../utils/create-elements/create-tags";
import { createH3 } from "../../utils/create-elements/create-tags";
import { createLabel } from "../../utils/create-elements/create-tags";
import { REGISTRATION } from "./constants";

export function createAddressBlock(
  headingText: string,
  inputs: HTMLElement[],
  defaultAddressCheckbox: HTMLElement
): HTMLElement {
  const heading = createH3({ text: headingText });

  const inputGroup = createDiv({
    children: inputs,
    classes: REGISTRATION.inputsContainer,
  });

  const label = createLabel({
    attributes: { for: defaultAddressCheckbox.getAttribute('id') || '' },
    text: 'Set as default address',
  });

  const checkboxWrapper = createDiv({
    children: [defaultAddressCheckbox, label],
    classes: CHECKBOX.general,
  });

  return createDiv({
    children: [heading, checkboxWrapper, inputGroup],
    classes: REGISTRATION.addressBlock,
  });
}
