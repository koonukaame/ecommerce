import type { Customer } from '@commercetools/platform-sdk';
import { API_URL, PROJECT_KEY } from '../constants';
import type { AuthTokenError } from '../types';

export async function getUserInfo(token: string): Promise<AuthTokenError | Customer> {
  try {
    const userResponse: Response = await fetch(`${API_URL}/${PROJECT_KEY}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    if (!userResponse.ok) {
      const error = await userResponse.json();

      return { message: error.message || 'Failed to fetch User Data' };
    }

    const response: Customer = await userResponse.json();

    return response;
  } catch {
    return { message: 'Unexpected error during fetching User Data' };
  }
}
