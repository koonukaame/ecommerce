import type { FetchError } from '../../app/types';
import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

export function isFetchError(data: ProductProjectionPagedQueryResponse | FetchError): data is FetchError {
  return 'message' in data && typeof data.message === 'string';
}
