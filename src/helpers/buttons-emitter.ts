import { CustomEventEmitter } from '../utils/event-emitter';
import type { WrappedInput } from '../shared/components/input';
import { resetInputDisplayFromServer } from './reset-input-display-from-server';

export const personalInfoEmitter = new CustomEventEmitter();
export const passwordEmitter = new CustomEventEmitter();

function toggleButtons([edit, save, cancel]: HTMLButtonElement[], isEditMode: boolean): void {
  edit.disabled = isEditMode;
  save.disabled = !isEditMode;
  cancel.disabled = !isEditMode;
}

function toggleInputs(inputs: HTMLInputElement[], isActive: boolean): void {
  for (const input of inputs) {
    input.disabled = !isActive;
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
): void {
  const inputs = wrappers.map((wrapper) => wrapper.input);

  emitter.subscribe('editBtnClick', () => {
    toggleButtons(buttons, true);
    toggleInputs(inputs, true);
  });

  emitter.subscribe('saveBtnClick', () => {
    toggleButtons(buttons, false);
    toggleInputs(inputs, false);

    if (emitter === passwordEmitter) {
      clearInputValues(inputs);
    }
  });

  emitter.subscribe('cancelBtnClick', async () => {
    toggleButtons(buttons, false);
    toggleInputs(inputs, false);

    if (emitter === personalInfoEmitter) {
      await resetInputDisplayFromServer(inputs);
    }

    if (emitter === passwordEmitter) {
      clearInputValues(inputs);
    }

    clearErrors(wrappers);
  });
}
