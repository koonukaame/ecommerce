import { describe, expect, it, vi } from 'vitest';

import { getAuthToken } from '../ecommerce/get-auth-token';
import { updatePersonalData } from './update-personal-data';
import { isFetchError } from '../../utils/type-guards/is-fetch-error';

const USER_DATA = {
  loginValid: 'ivanIvanov@yandex.ru',
  passwordValid: 'Ivan12345',
};

const MOCK_DATA = {
  firstName: `Inan${Math.random()}`,
  lastName: `Ivonov${Math.random()}`,
  dateOfBirth: '2020-01-01',
  email: 'ivanIvanov@yandex.ru',
};

describe('test with updatePersonalData function', () => {
  describe('successful updating data', () => {
    it('return data with valid credentials', async () => {
      const token = await getAuthToken(USER_DATA.loginValid, USER_DATA.passwordValid);

      if (typeof token !== 'string') {
        return { message: 'Failed to get token' };
      }

      const result = await updatePersonalData({ ...MOCK_DATA }, 1, token);

      if (isFetchError(result)) {
        expect(result).toHaveProperty('message');
        return;
      }

      expect(result).toHaveProperty('firstName');
      expect(result.firstName).toBe(MOCK_DATA.firstName);
      expect(result).toHaveProperty('lastName');
      expect(result.lastName).toBe(MOCK_DATA.lastName);
      expect(result).toHaveProperty('dateOfBirth');
      expect(result.dateOfBirth).toBe(MOCK_DATA.dateOfBirth);
    });
  });

  it('should return default error message if fetch fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

    const result = await updatePersonalData({ ...MOCK_DATA }, 1, 'any-token');
    expect(result).toEqual({ message: 'Unexpected error during updating personal data' });
  });
});
