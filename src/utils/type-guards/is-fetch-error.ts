import type { AuthTokenError, FetchError } from '../../app/types';
import type { Cart, Customer, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

export function isFetchError(
  data: Cart | Customer | ProductProjectionPagedQueryResponse | FetchError,
): data is FetchError {
  return 'message' in data && typeof data.message === 'string';
}

export function isAuthTokenError(data: Customer | AuthTokenError): data is AuthTokenError {
  return 'message' in data && typeof data.message === 'string';
}
