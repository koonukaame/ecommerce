import { getUserInfo } from '../app/api';
import { getAuthToken } from '../app/ecommerce/get-auth-token';
import type { FetchError } from '../app/types';

export async function resetInputDisplayFromServer(
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
