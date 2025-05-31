import type { Customer } from '@commercetools/platform-sdk';
import type { FetchError, ShippingDefaultAddress } from '../types';
import { API_URL, PROJECT_KEY } from '../constants';

export async function updateShippingDefaultAddress(
  shippingAddress: ShippingDefaultAddress,
  version: number,
  accessToken: string,
): Promise<Customer | FetchError> {
  const body = {
    version: version,
    actions: [
      {
        action: 'changeAddress',
        addressId: shippingAddress.id,
        address: {
          country: shippingAddress.country,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          streetName: shippingAddress.streetName,
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

      return { message: error.message || 'Failed to update shipping address' };
    }

    const updatedCustomer = await response.json();

    return updatedCustomer;
  } catch {
    return { message: 'Unexpected error during updating shipping address' };
  }
}
