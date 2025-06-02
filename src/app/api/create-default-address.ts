import type { Customer } from '@commercetools/platform-sdk';
import type { Address, FetchError } from '../types';
import { API_URL, PROJECT_KEY } from '../constants';
import { getUserInfo } from './get-user-info';

const actionType = {
  shipping: 'setDefaultShippingAddress',
  billing: 'setDefaultBillingAddress',
  'optional-shipping': 'addShippingAddressId',
  'optional-billing': 'addBillingAddressId',
};

export async function createDefaultAddress(
  address: Address,
  accessToken: string,
  type: 'shipping' | 'billing' | 'optional-shipping' | 'optional-billing',
): Promise<Customer | FetchError> {
  const key = `default-${type}`;
  const setAction = actionType[type];

  try {
    const customer = await getUserInfo(accessToken);
    if (!('id' in customer)) {
      return { message: 'Failed to get User Data' };
    }

    const existingAddress = customer.addresses?.find((address) => address.key === key);
    const actions = [];

    if (existingAddress) {
      actions.push({ action: 'removeAddress', addressId: existingAddress.id });
    }

    actions.push(
      {
        action: 'addAddress',
        address: {
          key: key,
          country: address.country,
          city: address.city,
          postalCode: address.postalCode,
          streetName: address.streetName,
        },
      },
      { action: setAction, addressKey: key },
    );

    const response = await updateActions(accessToken, customer, actions);

    if (!response.ok) {
      const error = await response.json();
      return { message: error.message || `Failed to update default ${type} address` };
    }

    return await response.json();
  } catch {
    return { message: `Unexpected error during updating default ${type} address` };
  }
}

async function updateActions(accessToken: string, customer: Customer, actions: object[]): Promise<Response> {
  const response = await fetch(`${API_URL}/${PROJECT_KEY}/me`, {
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

  return response;
}
