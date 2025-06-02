import type { CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import type { FetchError } from '../types';
import { API_URL, PROJECT_KEY } from '../constants';
import { getToken } from '../auth-service';

export async function getCategories(): Promise<CategoryPagedQueryResponse | FetchError> {
  const token = getToken();

  if (!token) {
    return { message: 'No token available' };
  }

  try {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/categories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();

      return { message: error.message || 'Failed to fetch products' };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: 'Unexpected error during fetching products' };
  }
}
