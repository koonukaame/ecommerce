import { describe, expect, it, vi } from 'vitest';

import { loginUser } from './login-user';

export const ERROR = {
  API_URL: {
    message: 'Unexpected error during login',
  },
  customerData: {
    message: 'Customer account with the given credentials not found.',
  },
  emptyEmail: {
    message: 'Customer account with the given credentials not found.',
  },
  emptyPassword: {
    message: 'Invalid parameter: password: Must not be empty.',
  },
};

const USER_DATA = {
  emptyData: '',
  loginInvalid: 'asdfasdf',
  loginValid: 'ivanIvanov@yandex.ru',
  passwordInvalid: '#$#23f',
  passwordValid: 'Ivan12345',
};

describe('test with loginUser function', () => {
  describe('successful login', () => {
    it('return user data with valid credentials', async () => {
      const result = await loginUser(USER_DATA.loginValid, USER_DATA.passwordValid);
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('password');
      expect(result).toHaveProperty('id');
    });
  });

  describe('invalid login cases', () => {
    it('return error for invalid email and password', async () => {
      const response = await loginUser(USER_DATA.loginInvalid, USER_DATA.passwordInvalid);
      expect(response).toEqual(ERROR.customerData);
    });

    it('return error when password is empty', async () => {
      const response = await loginUser(USER_DATA.loginValid, USER_DATA.emptyData);
      expect(response).toEqual(ERROR.emptyPassword);
    });

    it('return error when email is empty', async () => {
      const response = await loginUser(USER_DATA.emptyData, USER_DATA.passwordValid);
      expect(response).toEqual(ERROR.emptyEmail);
    });
  });
});

describe('when VITE_API_URL is invalid', () => {
  it('return error when API URL is wrong', async () => {
    vi.stubEnv('VITE_API_URL', 'wrong_api_url');
    vi.resetModules();

    const { loginUser } = await import('./login-user.ts');

    const result = await loginUser(USER_DATA.loginValid, USER_DATA.passwordValid);

    expect(result).toEqual(ERROR.API_URL);
  });
});
