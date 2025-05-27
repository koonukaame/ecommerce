import type { Customer } from '@commercetools/platform-sdk';
import { API_URL, PROJECT_KEY } from '../constants';
import type { FetchError } from '../types';

type PersonalData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
};

export async function updatePersonalData(
  updatedData: PersonalData,
  version: number,
  accessToken: string,
): Promise<Customer | FetchError> {
  const body = {
    version,
    actions: [
      { action: 'setFirstName', firstName: updatedData.firstName },
      { action: 'setLastName', lastName: updatedData.lastName },
      { action: 'setDateOfBirth', dateOfBirth: updatedData.dateOfBirth },
      { action: 'changeEmail', email: updatedData.email },
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
