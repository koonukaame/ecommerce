import { getUserInfo, updatePersonalData } from '../app/api';
import { createBillingAddress, createShippingAddress } from '../app/api/create-address';
import { updateAddress } from '../app/api/update-address';
import { updateUserPassword } from '../app/api/update-user-password';
import { getAuthToken } from '../app/ecommerce/get-auth-token';
import type { FetchError } from '../app/types';
import { CustomEventEmitterAsync } from '../utils/event-emitter';

export const personalDataEmitterAsync = new CustomEventEmitterAsync();
export const passwordEmitterAsync = new CustomEventEmitterAsync();
export const shippingAddressEmitterAsync = new CustomEventEmitterAsync();
export const billingAddressEmitterAsync = new CustomEventEmitterAsync();

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
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(error.message);
      }

      throw new Error('Unexpected error');
    }
  });
}

export async function updatePasswordEmitter(inputs: HTMLInputElement[]): Promise<FetchError | void> {
  passwordEmitterAsync.subscribe('updatePassword', async () => {
    const [currentPassword, newPassword] = inputs;

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

      const updatedPassword = {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      };

      const updatedUser = await updateUserPassword(updatedPassword, user.version, token, user.id);

      if (!('id' in updatedUser)) {
        throw new Error(updatedUser.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(error.message);
      }

      throw new Error('Unexpected error');
    }
  });
}

export async function updateShippingAddressEmitter(
  inputs: HTMLInputElement[],
  countrySelect: HTMLSelectElement,
  addressID: string | undefined,
): Promise<FetchError | void> {
  shippingAddressEmitterAsync.subscribe('updateShippingAddress', async () => {
    const [city, streetName, postalCode] = inputs;

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

      const address = {
        country: countrySelect.value,
        city: city.value,
        streetName: streetName.value,
        postalCode: postalCode.value,
        id: addressID,
      };

      // eslint-disable-next-line unicorn/prefer-ternary
      if (addressID) {
        await updateAddress(address, user.version, token);
      } else {
        await createShippingAddress(address, user.version, token);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(error.message);
      }

      throw new Error('Unexpected error');
    }
  });
}

export async function updateBillingAddressEmitter(
  inputs: HTMLInputElement[],
  countrySelect: HTMLSelectElement,
  addressID: string | undefined,
): Promise<FetchError | void> {
  billingAddressEmitterAsync.subscribe('updateBillingAddress', async () => {
    const [city, streetName, postalCode] = inputs;

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

      const address = {
        country: countrySelect.value,
        city: city.value,
        streetName: streetName.value,
        postalCode: postalCode.value,
        id: addressID,
      };

      // eslint-disable-next-line unicorn/prefer-ternary
      if (addressID) {
        await updateAddress(address, user.version, token);
      } else {
        await createBillingAddress(address, user.version, token);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new TypeError(error.message);
      }

      throw new Error('Unexpected error');
    }
  });
}
