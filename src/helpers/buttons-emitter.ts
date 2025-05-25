import { getUserInfo } from '../app/api/get-user-info';
import { getAuthToken } from '../app/ecommerce/get-auth-token';
import { CustomEventEmitter, CustomEventEmitterAsync } from '../utils/event-emitter';
import { updatePersonalData } from '../app/api';
import type { FetchError } from '../app/types';
import type { WrappedInput } from '../shared/components/input';

export const buttonEmitter = new CustomEventEmitter();
export const personalDataEmitterAsync = new CustomEventEmitterAsync();

function setButtonState(button: HTMLButtonElement, isActive: boolean): void {
  button.classList.toggle('cursor-pointer', isActive);
  button.classList.toggle('bg-blue-600', isActive);
  button.disabled = !isActive;
}

function setInputState(input: HTMLInputElement, isActive: boolean): void {
  input.classList.toggle('bg-gray-100');
  input.classList.toggle('text-gray-500');
  input.disabled = !isActive;
}

async function resetInputDisplayFromServer(
  firstNameInput: HTMLInputElement,
  lastNameInput: HTMLInputElement,
  dateOfBirthInput: HTMLInputElement,
  emailInput: HTMLInputElement,
): Promise<FetchError | void> {
  //! Delete in the future when I save token in local/session storage
  const token = await getAuthToken('ivanIvanov@yandex.ru', 'Ivan12345');

  if (typeof token !== 'string') {
    return { message: 'Failed to get token' };
  }

  const user = await getUserInfo(token);
  if (!('id' in user)) {
    return { message: 'Failed to get Personal Info' };
  }

  firstNameInput.value = user.firstName || '';
  lastNameInput.value = user.lastName || '';
  dateOfBirthInput.value = user.dateOfBirth || '';
  emailInput.value = user.email || '';
}

// eslint-disable-next-line max-lines-per-function
export function activateButtonEmitter(
  editButton: HTMLButtonElement,
  saveButton: HTMLButtonElement,
  cancelButton: HTMLButtonElement,
  firstNameWrapper: WrappedInput,
  lastNameWrapper: WrappedInput,
  dateOfBirthWrapper: WrappedInput,
  emailWrapper: WrappedInput,
): void {
  const firstNameInput = firstNameWrapper.input;
  const lastNameInput = lastNameWrapper.input;
  const dateOfBirthInput = dateOfBirthWrapper.input;
  const emailInput = emailWrapper.input;

  buttonEmitter.subscribe('editBtnClick', () => {
    setButtonState(editButton, false);
    setButtonState(saveButton, true);
    setButtonState(cancelButton, true);

    setInputState(firstNameInput, true);
    setInputState(lastNameInput, true);
    setInputState(dateOfBirthInput, true);
    setInputState(emailInput, true);
  });

  buttonEmitter.subscribe('saveBtnClick', () => {
    setButtonState(editButton, true);
    setButtonState(saveButton, false);
    setButtonState(cancelButton, false);

    setInputState(firstNameInput, false);
    setInputState(lastNameInput, false);
    setInputState(dateOfBirthInput, false);
    setInputState(emailInput, false);
  });

  buttonEmitter.subscribe('cancelBtnClick', async () => {
    setButtonState(editButton, true);
    setButtonState(saveButton, false);
    setButtonState(cancelButton, false);

    setInputState(firstNameInput, false);
    setInputState(lastNameInput, false);
    setInputState(dateOfBirthInput, false);
    setInputState(emailInput, false);

    firstNameWrapper.errorContainer.textContent = '';
    lastNameWrapper.errorContainer.textContent = '';
    dateOfBirthWrapper.errorContainer.textContent = '';
    emailWrapper.errorContainer.textContent = '';

    await resetInputDisplayFromServer(firstNameInput, lastNameInput, dateOfBirthInput, emailInput);
  });
}

export async function updatePersonalDataEmitter(
  nameInput: HTMLInputElement,
  surnameInput: HTMLInputElement,
  birthdateInput: HTMLInputElement,
  emailInput: HTMLInputElement,
): Promise<FetchError | void> {
  personalDataEmitterAsync.subscribe('updateUserData', async () => {
    const name = nameInput.value;
    const surname = surnameInput.value;
    const dateOfBirth = birthdateInput.value;
    const email = emailInput.value;

    try {
      //! Delete in the future when I save token via local/session storage
      const token = await getAuthToken('ivanIvanov@yandex.ru', 'Ivan12345');

      if (typeof token !== 'string') {
        return { message: 'Failed to get token to update Personal Data' };
      }

      const user = await getUserInfo(token);

      if (!('id' in user)) {
        return { message: 'Failed to get User Data' };
      }

      const updatedUser = await updatePersonalData(name, surname, dateOfBirth, email, user.version, token);

      if (!('id' in updatedUser)) {
        throw new Error(updatedUser.message);
      }

      console.log('Updated user', updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(error.message);
      }

      throw new Error('Unexpected error');
    }
  });
}
