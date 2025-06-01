import type { Customer } from '@commercetools/platform-sdk';
import type { FetchError, newAddress } from '../types';
import { API_URL, PROJECT_KEY } from '../constants';

export async function updateAddress(
  address: newAddress,
  version: number,
  accessToken: string,
): Promise<Customer | FetchError> {
  const body = {
    version: version,
    actions: [
      {
        action: 'changeAddress',
        addressId: address.id,
        address: {
          country: address.country,
          city: address.city,
          postalCode: address.postalCode,
          streetName: address.streetName,
        },
      },
    ],
  };

  try {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    console.log(response);

    if (!response.ok) {
      const error = await response.json();

      return { message: error.message || 'Failed to update address' };
    }

    const updatedCustomer = await response.json();

    return updatedCustomer;
  } catch {
    return { message: 'Unexpected error during updating address' };
  }
}
