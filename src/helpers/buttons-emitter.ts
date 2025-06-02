import { CustomEventEmitter } from '../utils/event-emitter';
import type { WrappedInput } from '../shared/components/input';
import {
  resetInputDisplayFromServer,
  resetDefaultAddressInputFromServer,
  resetOptionalAddressInputFromServer,
} from './reset-input-display-from-server';

export const personalInfoEmitter = new CustomEventEmitter();
export const passwordEmitter = new CustomEventEmitter();
export const defaultShippingAddressEmitter = new CustomEventEmitter();
export const defaultBillingAddressEmitter = new CustomEventEmitter();
export const firstOptionalAddressEmitter = new CustomEventEmitter();
export const secondOptionalAddressEmitter = new CustomEventEmitter();

function isAddressEmitter(emitter: CustomEventEmitter): boolean {
  return ![personalInfoEmitter, passwordEmitter].includes(emitter);
}

function toggleButtonsState(buttons: HTMLButtonElement[], isEditMode: boolean): void {
  for (const [index, button] of buttons.entries()) {
    button.disabled = index === 0 ? isEditMode : !isEditMode;
  }
}

function toggleRemoveButton(buttons: HTMLButtonElement[], show: boolean): void {
  const remove = buttons[3];
  if (!remove) {
    return;
  }
  remove.style.visibility = show ? 'visible' : 'hidden';
  remove.style.display = show ? 'inline-block' : 'none';
}

function toggleInputs(inputs: HTMLInputElement[], isActive: boolean, select?: HTMLSelectElement): void {
  for (const input of inputs) {
    input.disabled = !isActive;
  }

  if (select) {
    select.disabled = !isActive;
  }
}

function clearErrors(wrappers: WrappedInput[]): void {
  for (const wrapper of wrappers) {
    wrapper.errorContainer.textContent = '';
  }
}

function clearInputValues(inputs: HTMLInputElement[]): void {
  for (const input of inputs) {
    input.value = '';
  }
}

// eslint-disable-next-line max-lines-per-function
export function activateButtonEmitter(
  emitter: CustomEventEmitter,
  buttons: HTMLButtonElement[],
  wrappers: WrappedInput[],
  select?: HTMLSelectElement,
): void {
  const inputs = wrappers.map((wrapper) => wrapper.input);
  const addressMode = isAddressEmitter(emitter);

  function handleToggle(isEdit: boolean): void {
    toggleButtonsState(buttons, isEdit);
    toggleInputs(inputs, isEdit, select);
    if (addressMode) {
      toggleRemoveButton(buttons, isEdit);
    }
  }

  emitter.subscribe('editBtnClick', () => handleToggle(true));

  emitter.subscribe('saveBtnClick', () => {
    handleToggle(false);

    if (emitter === passwordEmitter) {
      clearInputValues(inputs);
    }
  });

  emitter.subscribe('cancelBtnClick', async () => {
    handleToggle(false);
    if (emitter === personalInfoEmitter) {
      await resetInputDisplayFromServer(inputs);
    }
    if (emitter === passwordEmitter) {
      clearInputValues(inputs);
    }
    if (emitter === defaultShippingAddressEmitter && select instanceof HTMLSelectElement) {
      await resetDefaultAddressInputFromServer(inputs, select, 'shipping');
    }
    if (emitter === defaultBillingAddressEmitter && select instanceof HTMLSelectElement) {
      await resetDefaultAddressInputFromServer(inputs, select, 'billing');
    }
    if (emitter === firstOptionalAddressEmitter && select instanceof HTMLSelectElement) {
      await resetOptionalAddressInputFromServer(inputs, select, 'optional-shipping');
    }
    if (emitter === secondOptionalAddressEmitter && select instanceof HTMLSelectElement) {
      await resetOptionalAddressInputFromServer(inputs, select, 'optional-billing');
    }
    clearErrors(wrappers);
  });

  emitter.subscribe('removeBtnClick', async () => {
    handleToggle(false);
    clearErrors(wrappers);
    clearInputValues(inputs);
    if (select) {
      select.value = '';
    }
  });
}
