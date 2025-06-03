import { describe, beforeEach, expect, it, vi } from 'vitest';

import { getAllProducts } from './get-all-products';
import { isFetchError } from '../../utils/type-guards/is-fetch-error';
import * as authService from '../auth-service';

const MOCK_TOKEN = 'mock-token';

describe('test getAllProducts function', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(authService, 'getToken').mockReturnValue(MOCK_TOKEN);
  });

  it('return products with valid data', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        count: 1,
        limit: 50,
        offset: 0,
        total: 1,
        results: [],
      }),
    });

    const products = await getAllProducts();

    if (isFetchError(products)) {
      throw new TypeError('Failed to get products');
    }

    expect(products).toHaveProperty('count');
    expect(products).toHaveProperty('limit');
    expect(products).toHaveProperty('offset');
    expect(products).toHaveProperty('results');
    expect(products).toHaveProperty('total');
  });
});

describe('Error message', () => {
  it('should return message when response is not ok', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Invalid request' }),
    });

    const result = await getAllProducts();

    expect(result).toEqual({ message: 'Invalid request' });
  });

  it('should return "Network Error" message', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

    const result = await getAllProducts();
    expect(result).toEqual({ message: 'Network Error' });
  });

  it('should return default message when unknown error thrown', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue('some error value');

    const result = await getAllProducts();

    expect(result).toEqual({ message: 'Unexpected error during fetching products' });
  });
});
