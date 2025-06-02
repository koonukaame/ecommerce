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

function toggleButtons([edit, save, cancel]: HTMLButtonElement[], isEditMode: boolean): void {
  edit.disabled = isEditMode;
  save.disabled = !isEditMode;
  cancel.disabled = !isEditMode;
}

function toggleAddresButtons([edit, save, cancel, remove]: HTMLButtonElement[], isEditMode: boolean): void {
  edit.disabled = isEditMode;
  save.disabled = !isEditMode;
  cancel.disabled = !isEditMode;
  remove.disabled = !isEditMode;
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

  emitter.subscribe('editBtnClick', () => {
    if (emitter !== personalInfoEmitter && emitter !== passwordEmitter) {
      toggleAddresButtons(buttons, true);
      buttons[0].style.visibility = 'hidden';
      buttons[3].style.visibility = 'visible';
      buttons[3].style.display = 'inline-block';
    } else {
      toggleButtons(buttons, true);
    }

    toggleInputs(inputs, true, select);
  });

  emitter.subscribe('saveBtnClick', () => {
    if (emitter !== personalInfoEmitter && emitter !== passwordEmitter) {
      toggleAddresButtons(buttons, false);
      buttons[0].style.visibility = 'visible';
      buttons[3].style.visibility = 'hidden';
      buttons[3].style.display = 'none';
    } else {
      toggleButtons(buttons, false);
    }

    toggleInputs(inputs, false, select);

    if (emitter === passwordEmitter) {
      clearInputValues(inputs);
    }
  });

  emitter.subscribe('cancelBtnClick', async () => {
    if (emitter !== personalInfoEmitter && emitter !== passwordEmitter) {
      toggleAddresButtons(buttons, false);
      buttons[0].style.visibility = 'visible';
      buttons[3].style.visibility = 'hidden';
      buttons[3].style.display = 'none';
    } else {
      toggleButtons(buttons, false);
    }

    toggleInputs(inputs, false, select);

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
}
