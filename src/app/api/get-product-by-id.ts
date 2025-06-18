import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { API_URL, PROJECT_KEY } from '../constants';
import type { FetchError } from '../types';
import { getToken } from '../auth-service';

export async function getProductById(id: string): Promise<ProductProjectionPagedQueryResponse | FetchError> {
  const token = getToken();

  if (!token) {
    return { message: 'No token available' };
  }

  try {
    const response = await fetch(
      `${API_URL}/${PROJECT_KEY}/product-projections?where=slug(en="${id}")&expand=categories[*]`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const error = await response.json();

      return { message: error.message || 'Failed to fetch a product' };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: 'Unexpected error during fetching a product' };
  }
}
