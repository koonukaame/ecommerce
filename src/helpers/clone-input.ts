import { REGISTRATION_INPUTS_CONFIG } from '../components/registration/input';

export function cloneInputs(inputs: HTMLElement[], addressName: string): HTMLElement[] {
  return inputs.map((container) => {
    const clonedElement = container.cloneNode(true);
    if (!(clonedElement instanceof HTMLElement)) {
      throw new TypeError('cloned node is not an HTMLElement');
    }

    modifyInputElementName(clonedElement, addressName);
    modifySelectElementName(clonedElement, addressName);

    return clonedElement;
  });
}

function addInputEvents(input: HTMLInputElement, originalName: string): void {
  console.log('originalName from input:', originalName);
  const configEntry = Object.entries(REGISTRATION_INPUTS_CONFIG).find(
    ([, value]) => value.attributes?.name === originalName,
  );

  if (configEntry) {
    const [, config] = configEntry;
    if (config.events) {
      for (const [eventName, handler] of Object.entries(config.events)) {
        input.addEventListener(eventName, handler);
      }
    }
  }

  if (!configEntry) {
    console.warn('No config found for', originalName);
  }
}

function modifyInputElementName(element: HTMLElement, addressName: string): void {
  const input = element.querySelector('input');
  if (!input) {
    return;
  }

  const originalName = input.getAttribute('name');
  if (!originalName) {
    throw new Error('input element does not have name attribute');
  }

  input.setAttribute('name', `${addressName}${originalName}`);
  addInputEvents(input, originalName);
}

function modifySelectElementName(element: HTMLElement, addressName: string): void {
  if (!(element instanceof HTMLSelectElement)) {
    return;
  }

  const originalName = element.getAttribute('name');
  if (!originalName) {
    throw new Error('select does not have name attribute');
  }

  element.setAttribute('name', `${addressName}${originalName}`);
}
