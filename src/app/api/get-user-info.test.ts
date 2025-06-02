import { describe, expect, it, vi } from 'vitest';

import { getUserInfo } from './get-user-info';
import { getAuthToken } from '../ecommerce/get-auth-token';

const USER_DATA = {
  loginValid: 'ivanIvanov@yandex.ru',
  passwordValid: 'Ivan12345',
};

describe('test with loginUser function', () => {
  describe('successful getting info', () => {
    it('return info with valid credentials', async () => {
      const token = await getAuthToken(USER_DATA.loginValid, USER_DATA.passwordValid);

      if (typeof token !== 'string') {
        return { message: 'Failed to get token' };
      }

      const result = await getUserInfo(token);
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('password');
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('firstName');
      expect(result).toHaveProperty('lastName');
      expect(result).toHaveProperty('dateOfBirth');
    });
  });

  it('return FetchError', async () => {
    const result = await getUserInfo('invalid-token');
    expect(result).toHaveProperty('message');
  });

  it('should return default error message if fetch fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

    const result = await getUserInfo('any-token');
    expect(result).toEqual({ message: 'Unexpected error during fetching User Data' });
  });
});
