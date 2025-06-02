import { describe, expect, it, vi } from 'vitest';

import { getProductById } from './get-product-by-id';
import { isFetchError } from '../../utils/type-guards/is-fetch-error';

const ID = 'silver-fox-fur-coat';

describe('test getProductById function', () => {
  it('return info with valid credentials', async () => {
    const product = await getProductById(ID);

    if (isFetchError(product)) {
      throw new TypeError('Failed to get product by ID');
    }

    expect(product).toHaveProperty('count');
    expect(product).toHaveProperty('limit');
    expect(product).toHaveProperty('offset');
    expect(product).toHaveProperty('results');
    expect(product).toHaveProperty('total');
  });
});

describe('Network Error', () => {
  it('should return "Network Error" message', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

    const result = await getProductById('any-id');
    expect(result).toEqual({ message: 'Network Error' });
  });
});
