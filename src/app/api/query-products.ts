import { getAnonymousToken } from '../ecommerce/get-anonymous-token';
import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import type { FetchError } from '../types';
import { API_URL, PROJECT_KEY } from '../constants';
import { createQueryParameters } from '../../utils/create-query-parameters/create-query-parameters';

export async function queryProducts(
  search?: string,
  sort?: string,
  filterPrice?: { min: string; max: string },
  filterLength?: string[],
  category?: string,
): Promise<ProductProjectionPagedQueryResponse | FetchError> {
  const token = await getAnonymousToken();

  const queryParameters = createQueryParameters(search, sort, filterPrice, filterLength, category);

  try {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/product-projections/search?${queryParameters}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

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
