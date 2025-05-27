import { CustomEventEmitter } from '../utils/event-emitter';
import type { WrappedInput } from '../shared/components/input';
import { resetInputDisplayFromServer } from './reset-input-display-from-server';

export const buttonEmitter = new CustomEventEmitter();

function toggleButtons(
  edit: HTMLButtonElement,
  save: HTMLButtonElement,
  cancel: HTMLButtonElement,
  isEditMode: boolean,
): void {
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

export function activateButtonEmitter(
  editButton: HTMLButtonElement,
  saveButton: HTMLButtonElement,
  cancelButton: HTMLButtonElement,
  firstNameWrapper: WrappedInput,
  lastNameWrapper: WrappedInput,
  dateOfBirthWrapper: WrappedInput,
  emailWrapper: WrappedInput,
): void {
  const wrappers = [firstNameWrapper, lastNameWrapper, dateOfBirthWrapper, emailWrapper];
  const inputs = [firstNameWrapper.input, lastNameWrapper.input, dateOfBirthWrapper.input, emailWrapper.input];

  buttonEmitter.subscribe('editBtnClick', () => {
    toggleButtons(editButton, saveButton, cancelButton, true);
    toggleInputs(inputs, true);
  });

  buttonEmitter.subscribe('saveBtnClick', () => {
    toggleButtons(editButton, saveButton, cancelButton, false);
    toggleInputs(inputs, false);
  });

  buttonEmitter.subscribe('cancelBtnClick', async () => {
    toggleButtons(editButton, saveButton, cancelButton, false);
    toggleInputs(inputs, false);
    clearErrors(wrappers);

    await resetInputDisplayFromServer(
      firstNameWrapper.input,
      lastNameWrapper.input,
      dateOfBirthWrapper.input,
      emailWrapper.input,
    );
  });
}
