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
    handleResetByEmitter(emitter, inputs, select);
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

async function handleResetByEmitter(
  emitter: CustomEventEmitter,
  inputs: HTMLInputElement[],
  select?: HTMLSelectElement,
): Promise<void> {
  if (emitter === personalInfoEmitter) {
    await resetInputDisplayFromServer(inputs);
    return;
  }

  if (emitter === passwordEmitter) {
    clearInputValues(inputs);
    return;
  }

  if (!(select instanceof HTMLSelectElement)) {
    return;
  }

  switch (emitter) {
    case defaultShippingAddressEmitter: {
      await resetDefaultAddressInputFromServer(inputs, select, 'shipping');
      break;
    }
    case defaultBillingAddressEmitter: {
      await resetDefaultAddressInputFromServer(inputs, select, 'billing');
      break;
    }
    case firstOptionalAddressEmitter: {
      await resetOptionalAddressInputFromServer(inputs, select, 'optional-shipping');
      break;
    }
    case secondOptionalAddressEmitter: {
      await resetOptionalAddressInputFromServer(inputs, select, 'optional-billing');
      break;
    }
  }
}
