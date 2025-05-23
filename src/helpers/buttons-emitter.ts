import { CustomEventEmitter } from '../utils/event-emitter';

export const buttonEmitter = new CustomEventEmitter();

export function activateButtonEmitter(
  editButton: HTMLButtonElement,
  saveButton: HTMLButtonElement,
  cancelButton: HTMLButtonElement,
  nameInput: HTMLInputElement,
  surnameInput: HTMLInputElement,
  birthdateInput: HTMLInputElement,
): void {
  console.log('Emitter activated');

  buttonEmitter.subscribe('editBtnClick', () => {
    console.log('editBtnClick');
    console.log(editButton);
  });

  buttonEmitter.subscribe('saveBtnClick', () => {
    console.log('saveBtnClick');
    console.log(saveButton);
  });

  buttonEmitter.subscribe('cancelBtnClick', () => {
    console.log('cancelBtnClick');
    console.log(cancelButton);
  });

  buttonEmitter.subscribe('updateUserData', async () => {
    console.log('updateUserData');
    console.log(nameInput);
    console.log(surnameInput);
    console.log(birthdateInput);
  });
}
