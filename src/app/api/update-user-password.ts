import type { Customer } from '@commercetools/platform-sdk';
import type { FetchError, UpdatedPassword } from '../types';
import { API_URL, PROJECT_KEY } from '../constants';

export async function updateUserPassword(
  updatedPassword: UpdatedPassword,
  version: number,
  accessToken: string,
  customerId: string,
): Promise<Customer | FetchError> {
  try {
    console.log('старый пароль', updatedPassword.currentPassword);

    console.log('новый пароль', updatedPassword.newPassword);

    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...updatedPassword, version, customerId }),
    });

    if (!response.ok) {
      const error = await response.json();

      return { message: error.message || 'Failed to update new password' };
    }

    const updatedCustomer = await response.json();

    return updatedCustomer;
  } catch {
    return { message: 'Unexpected error during updating new password' };
  }
}
