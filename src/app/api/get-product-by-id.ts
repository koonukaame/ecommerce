import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { API_URL, PROJECT_KEY } from '../constants';
import { getAnonymousToken } from '../ecommerce/get-anonymous-token';
import type { FetchError } from '../types';

export async function getProductById(id: string): Promise<ProductProjectionPagedQueryResponse | FetchError> {
  // TODO! in the future use local/session storage to get the token
  const token = await getAnonymousToken();

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
