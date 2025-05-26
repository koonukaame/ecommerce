import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import type { FetchError } from '../../app/types';

import { container } from '../../shared/components/container';
import { productLayout } from '../../components/product/layout';
import { getProductById } from '../../app/api/get-product-by-id';
import { createInfoMessage } from '../../shared/components/info-message';

export async function ProductPage(slug = 'silver-fox-fur-coat'): Promise<HTMLElement | void> {
  const data = await getProductById(slug);

  if (isFetchError(data) || data.count === 0) {
    createInfoMessage(container, 'Product Not Found');
    return;
  }
  const layout = productLayout(data);

  container.append(layout);

  return container;
}

function isFetchError(data: FetchError | ProductProjectionPagedQueryResponse): data is FetchError {
  return 'message' in data && typeof data.message === 'string';
}
