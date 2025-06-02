import type { AuthTokenError, FetchError } from '../../app/types';
import type { Customer, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

export function isFetchError(data: Customer | ProductProjectionPagedQueryResponse | FetchError): data is FetchError {
  return 'message' in data && typeof data.message === 'string';
}

export function isAuthTokenError(data: Customer | AuthTokenError): data is AuthTokenError {
  return 'message' in data && typeof data.message === 'string';
}
