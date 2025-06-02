import { describe, expect, it, vi } from 'vitest';

import { getAuthToken } from '../ecommerce/get-auth-token';
import { updatePersonalData } from './update-personal-data';
import { isFetchError } from '../../utils/type-guards/is-fetch-error';

const MOCK_USER = {
  id: 'user-1',
  version: '33',
  loginValid: 'ivanIvanov@yandex.ru',
  passwordValid: 'Ivan12345',
};

const MOCK_DATA = {
  firstName: `Inan${Math.random()}`,
  lastName: `Ivonov${Math.random()}`,
  dateOfBirth: '2020-01-01',
  email: 'ivanIvanov@yandex.ru',
};

const VERSION = 33;
const TOKEN = 'any-token';

describe('test with updatePersonalData function', () => {
  it('return data with valid data', async () => {
    const token = await getAuthToken(MOCK_USER.loginValid, MOCK_USER.passwordValid);

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

  it('return updated data', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => MOCK_USER,
    });

    const result = await updatePersonalData(MOCK_DATA, VERSION, TOKEN);

    expect(result).toEqual(MOCK_USER);
  });

  it('should return default error message if fetch fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

    const result = await updatePersonalData({ ...MOCK_DATA }, 1, 'any-token');
    expect(result).toEqual({ message: 'Unexpected error during updating personal data' });
  });
});
