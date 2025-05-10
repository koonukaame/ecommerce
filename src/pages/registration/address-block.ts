import { CHECKBOX } from "../../shared/styles";
import { createDiv } from "../../utils/create-elements/create-tags";
import { createFieldset, createLabel, createLegend } from "../../utils/create-elements/create-tags";
import { REGISTRATION } from "./constants";

export function createAddressBlock(
  headingText: string,
  inputs: HTMLElement[],
  defaultAddressCheckbox: HTMLElement,
): HTMLElement {
  const heading = createLegend({ text: headingText });

  const inputGroup = createDiv({
    children: inputs,
    classes: REGISTRATION.inputsContainer,
  });

  const defaultLabel = createLabel({
    attributes: { for: defaultAddressCheckbox.getAttribute('id') || '' },
    text: 'Set as default address',
  });

  const checkboxDefaultWrapper = createDiv({
    children: [defaultAddressCheckbox, defaultLabel],
    classes: CHECKBOX.general,
  });

  return createFieldset({
    children: [heading, checkboxDefaultWrapper, inputGroup],
    classes: REGISTRATION.addressBlock,
  });
}