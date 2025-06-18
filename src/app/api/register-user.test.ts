import { describe, expect, it, vi } from 'vitest';

export const ERROR = {
  alreadyRegistered: {
    message: 'There is already an existing customer with the provided email.',
  },
  API_URL: {
    message: 'Unexpected error during registration',
  },
  emptyEmail: {
    message: 'Email is required',
  },
  emptyPassword: {
    message: 'Password is required',
  },
};

describe('test with registerUser function', () => {
  it('return already registered error', async () => {
    const customerDraft = { email: 'ivanIvanov@yandex.ru', password: 'Ivan12345' };

    const { registerUser } = await import('./register-user.ts');

    const result = await registerUser(customerDraft);

    expect(result).toEqual(ERROR.alreadyRegistered);
  });
});

describe('empty password', () => {
  it('return error for empty password', async () => {
    const customerDraft = { email: 'ivanIvanov@yandex.ru', password: '' };

    const { registerUser } = await import('./register-user.ts');

    const result = await registerUser(customerDraft);

    expect(result).toEqual(ERROR.emptyPassword);
  });
});

describe('empty email', () => {
  it('return error for empty email', async () => {
    const customerDraft = { email: '', password: 'sdf' };

    const { registerUser } = await import('./register-user.ts');

    const result = await registerUser(customerDraft);

    expect(result).toEqual(ERROR.emptyEmail);
  });
});

describe('invalid API_URL', () => {
  it('return error when API URL is invalid', async () => {
    const customerDraft = { email: 'ivanIvanov@yandex.ru', password: 'Ivan12345' };

    vi.stubEnv('VITE_API_URL', 'wrong_api_url.com');
    vi.resetModules();

    const { registerUser } = await import('./register-user.ts');

    const result = await registerUser(customerDraft);

    expect(result).toEqual(ERROR.API_URL);
  });
});
