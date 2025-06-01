import type { Customer } from '@commercetools/platform-sdk';
import type { Address, FetchError } from '../types';
import { API_URL, PROJECT_KEY } from '../constants';

export async function createDefaultAddress(
  address: Address,
  version: number,
  accessToken: string,
  type: 'shipping' | 'billing',
): Promise<Customer | FetchError> {
  const addressKey = `default-${type}`;
  const action = type === 'shipping' ? 'setDefaultShippingAddress' : 'setDefaultBillingAddress';

  const body = {
    version,
    actions: [
      {
        action: 'addAddress',
        address: {
          key: addressKey,
          country: address.country,
          city: address.city,
          postalCode: address.postalCode,
          streetName: address.streetName,
        },
      },
      { action, addressKey },
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

    if (!response.ok) {
      const error = await response.json();
      return {
        message: error.message || `Failed to create default ${type} address`,
      };
    }

    const updatedCustomer = await response.json();
    return updatedCustomer;
  } catch {
    return {
      message: `Unexpected error during creating default ${type} address`,
    };
  }
}
