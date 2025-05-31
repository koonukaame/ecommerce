import type { Customer } from '@commercetools/platform-sdk';
import type { FetchError, ShippingDefaultAddress } from '../types';
import { API_URL, PROJECT_KEY } from '../constants';

export async function createShippingAddress(
  shippingAddress: ShippingDefaultAddress,
  version: number,
  accessToken: string,
): Promise<Customer | FetchError> {
  const addressKey = 'default-shipping';
  const body = {
    version,
    actions: [
      {
        action: 'addAddress',
        address: {
          key: addressKey,
          country: shippingAddress.country,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          streetName: shippingAddress.streetName,
        },
      },
      { action: 'setDefaultShippingAddress', addressKey },
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

      return { message: error.message || 'Failed to create default shipping address' };
    }

    const updatedCustomer = await response.json();

    return updatedCustomer;
  } catch {
    return { message: 'Unexpected error during creating default shipping address' };
  }
}
