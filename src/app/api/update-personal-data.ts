import type { Customer } from '@commercetools/platform-sdk';
import { API_URL, PROJECT_KEY } from '../constants';
import type { FetchError } from '../types';

export async function updatePersonalData(
  name: string,
  surname: string,
  dateOfBirth: string,
  email: string,
  version: number,
  accessToken: string,
): Promise<Customer | FetchError> {
  const body = {
    version,
    actions: [
      { action: 'setFirstName', firstName: name },
      { action: 'setLastName', lastName: surname },
      { action: 'setDateOfBirth', dateOfBirth: dateOfBirth },
      { action: 'changeEmail', email: email },
    ],
  };

  try {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();

      return { message: error.message || 'Failed to update personal data' };
    }

    const updatedCustomer = await response.json();

    return updatedCustomer;
  } catch {
    return { message: 'Unexpected error during updating personal data' };
  }
}
