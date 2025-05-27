import { getUserInfo, updatePersonalData } from '../app/api';
import { getAuthToken } from '../app/ecommerce/get-auth-token';
import type { FetchError } from '../app/types';
import { CustomEventEmitterAsync } from '../utils/event-emitter';

export const personalDataEmitterAsync = new CustomEventEmitterAsync();

export async function updatePersonalDataEmitter(inputs: HTMLInputElement[]): Promise<FetchError | void> {
  personalDataEmitterAsync.subscribe('updateUserData', async () => {
    const [nameInput, surnameInput, birthdateInput, emailInput] = inputs;

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

      const updatedData = {
        firstName: nameInput.value,
        lastName: surnameInput.value,
        dateOfBirth: birthdateInput.value,
        email: emailInput.value,
      };

      const updatedUser = await updatePersonalData({ ...updatedData }, user.version, token);

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
