import type { Customer } from '@commercetools/platform-sdk';
import type { FetchError } from '../types';
import { API_URL, PROJECT_KEY } from '../constants';

export async function removeAddressById(
  addressId: string,
  version: number,
  accessToken: string,
): Promise<Customer | FetchError> {
  try {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version,
        actions: [
          {
            action: 'removeAddress',
            addressId,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();

      return { message: error.message || 'Failed to to delete the address' };
    }

    return await response.json();
  } catch {
    return { message: 'Unexpected error during deleting the address' };
  }
}
