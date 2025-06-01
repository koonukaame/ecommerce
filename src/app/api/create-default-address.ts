import type { Customer } from '@commercetools/platform-sdk';
import type { Address, FetchError } from '../types';
import { API_URL, PROJECT_KEY } from '../constants';

// eslint-disable-next-line max-lines-per-function
export async function createDefaultAddress(
  address: Address,
  accessToken: string,
  type: 'shipping' | 'billing' | 'optional-shipping' | 'optional-billing',
): Promise<Customer | FetchError> {
  const actionType = {
    shipping: 'setDefaultShippingAddress',
    billing: 'setDefaultBillingAddress',
    'optional-shipping': 'addShippingAddressId',
    'optional-billing': 'addBillingAddressId',
  };
  const addressKey = `default-${type}`;
  const setAction = actionType[type];

  try {
    const customerResponse = await fetch(`${API_URL}/${PROJECT_KEY}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!customerResponse.ok) {
      const error = await customerResponse.json();
      return { message: error.message || 'Failed to get customer data' };
    }

    const customer: Customer = await customerResponse.json();
    const existingAddress = customer.addresses?.find((address) => address.key === addressKey);
    const actions = [];

    if (existingAddress) {
      actions.push({ action: 'removeAddress', addressId: existingAddress.id });
    }

    actions.push(
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
      { action: setAction, addressKey },
    );

    const updateResponse = await fetch(`${API_URL}/${PROJECT_KEY}/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        version: customer.version,
        actions,
      }),
    });

    if (!updateResponse.ok) {
      const error = await updateResponse.json();
      return { message: error.message || `Failed to update default ${type} address` };
    }

    return await updateResponse.json();
  } catch {
    return { message: `Unexpected error during updating default ${type} address` };
  }
}
