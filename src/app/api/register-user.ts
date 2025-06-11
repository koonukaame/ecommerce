import { type Customer, type CustomerDraft } from '@commercetools/platform-sdk';

import { API_URL, PROJECT_KEY } from '../constants';
import { getAnonymousToken } from '../ecommerce/get-anonymous-token';
import { getAuthToken } from '../ecommerce/get-auth-token';
import { type RegisterError } from '../types';

export async function registerUser(customerDraft: CustomerDraft): Promise<Customer | RegisterError> {
  const { email, password } = customerDraft;

  if (!password) {
    return { message: 'Password is required' };
  }

  if (!email) {
    return { message: 'Email is required' };
  }

  try {
    const anonymousToken = await getAnonymousToken();

    if ('access_token' in anonymousToken && typeof anonymousToken.access_token !== 'string') {
      return anonymousToken.access_token;
    }

    const response: Response = await fetch(`${API_URL}/${PROJECT_KEY}/me/signup`, {
      body: JSON.stringify(customerDraft),
      headers: {
        Authorization: `Bearer ${anonymousToken}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message || 'Failed to register user' };
    }

    const authToken = await getAuthToken(email, password);

    if ('access_token' in authToken && typeof authToken.access_token !== 'string') {
      return authToken.access_token;
    }

    const { customer } = data;
    return customer;
  } catch {
    return { message: 'Unexpected error during registration' };
  }
}
