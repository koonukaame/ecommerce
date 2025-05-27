import { CustomEventEmitter } from '../utils/event-emitter';
import type { WrappedInput } from '../shared/components/input';
import { resetInputDisplayFromServer } from './reset-input-display-from-server';

export const buttonEmitter = new CustomEventEmitter();

function setButtonState(button: HTMLButtonElement, isActive: boolean): void {
  button.classList.toggle('cursor-pointer', isActive);
  button.classList.toggle('bg-yellow-600', isActive);
  button.disabled = !isActive;
}

function setInputState(input: HTMLInputElement, isActive: boolean): void {
  input.classList.toggle('bg-gray-100');
  input.classList.toggle('text-gray-500');
  input.disabled = !isActive;
}

function toggleButtons(
  edit: HTMLButtonElement,
  save: HTMLButtonElement,
  cancel: HTMLButtonElement,
  isEditMode: boolean,
): void {
  setButtonState(edit, !isEditMode);
  setButtonState(save, isEditMode);
  setButtonState(cancel, isEditMode);
}

function toggleInputs(inputs: HTMLInputElement[], isActive: boolean): void {
  for (const input of inputs) {
    setInputState(input, isActive);
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
