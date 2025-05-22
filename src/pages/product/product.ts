import { container } from '../../shared/components/container';
import { productLayout } from '../../components/product/layout';
import { getProductById } from '../../app/api/get-product-by-id';
import { ProductNotFound } from '../underconstruction';
import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import type { FetchError } from '../../app/types';

export async function ProductPage(slug = 'mouton-fur-coat'): Promise<HTMLElement> {
  const data = await getProductById(slug);

  if (isFetchError(data) || data.count === 0) {
    return ProductNotFound();
  }
  const layout = productLayout(data);

  container.append(layout);

  return container;
}

function isFetchError(data: FetchError | ProductProjectionPagedQueryResponse): data is FetchError {
  return 'message' in data && typeof data.message === 'string';
}
