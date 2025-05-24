import { API_URL, PROJECT_KEY } from '../constants';
import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { getAnonymousToken } from '../ecommerce/get-anonymous-token';
import type { FetchError } from '../types';

export async function searchProducts(query: string): Promise<ProductProjectionPagedQueryResponse | FetchError> {
  const token = await getAnonymousToken();

  try {
    const response = await fetch(
      `${API_URL}/${PROJECT_KEY}/product-projections/search?text.en=${encodeURIComponent(query)}&fuzzy=true&markMatchingVariants=true`,
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
