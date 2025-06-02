import { describe, expect, it, vi } from 'vitest';

import { getAuthToken } from '../ecommerce/get-auth-token';
import { updateUserPassword } from './update-user-password';
import { isAuthTokenError, isFetchError } from '../../utils/type-guards/is-fetch-error';
import { getUserInfo } from './get-user-info';

const MAX_RANDOM = 10_000;
const USER_DATA = {
  loginValid: 'ivanIvanov@yandex.ru',
  passwordValid: 'Ivan12345',
};

const MOCK_DATA = {
  currentPassword: 'Ivan12345',
  newPassword: 'Test',
};

describe('test with updateUserPassword function', () => {
  it('successfully changes and rolls back password', async () => {
    MOCK_DATA.newPassword = `Test${Math.ceil(Math.random() * MAX_RANDOM)}`;

    const token = await getAuthToken(USER_DATA.loginValid, USER_DATA.passwordValid);
    if (typeof token !== 'string') {
      throw new TypeError('Can`t get token');
    }

    const user = await getUserInfo(token);
    if (isAuthTokenError(user)) {
      throw new TypeError(user.message);
    }

    const changeResult = await updateUserPassword({ ...MOCK_DATA }, user.version, token, user.id);
    if (isFetchError(changeResult)) {
      throw new TypeError(changeResult.message);
    }

    expect(changeResult).toHaveProperty('authenticationMode');
    expect(changeResult.authenticationMode).toBe('Password');

    const newToken = await getAuthToken(USER_DATA.loginValid, MOCK_DATA.newPassword);
    if (typeof newToken !== 'string') {
      throw new TypeError('Can`t get new token');
    }

    const recoverUser = await getUserInfo(newToken);
    if (isAuthTokenError(recoverUser)) {
      throw new TypeError(`get recovery data failed: ${recoverUser.message}`);
    }
    const recoverResult = await updateUserPassword(
      {
        currentPassword: MOCK_DATA.newPassword,
        newPassword: MOCK_DATA.currentPassword,
      },
      recoverUser.version,
      newToken,
      recoverUser.id,
    );
    if (isFetchError(recoverResult)) {
      throw new TypeError(`data recovery failed: ${recoverResult.message}`);
    }
    expect(recoverResult.authenticationMode).toBe('Password');
  });
});

describe('error message', () => {
  it('should return default error message if fetch fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));
    const result = await updateUserPassword({ ...MOCK_DATA }, 1, 'any-token', 'any-id');
    expect(result).toEqual({ message: 'Unexpected error during updating new password' });
  });
});
