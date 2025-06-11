import type { Customer } from '@commercetools/platform-sdk';
import { getUserInfo } from '../app/api';
import type { FetchError } from '../app/types';
import { getToken, isTokenExpired, refreshAccessToken } from '../app/auth-service';

export async function getAuthorizedUser(): Promise<Customer | FetchError> {
  if (isTokenExpired()) {
    await refreshAccessToken();
  }
  const token = getToken();

  if (!token) {
    return { message: 'No token available' };
  }

  if (typeof token !== 'string') {
    return { message: 'Failed to get token' };
  }

  const user = await getUserInfo(token);

  if (!('id' in user)) {
    return { message: 'Failed to get Personal Data' };
  }

  return user;
}
