import { describe, beforeEach, expect, it, vi } from 'vitest';

import { updateAddress } from './update-address';

const MOCK_USER = {
  id: 'user-1',
  version: '33',
  loginValid: 'ivanIvanov@yandex.ru',
  passwordValid: 'Ivan12345',
};

const MOCK_ADDRESS = {
  country: 'test',
  city: 'test',
  streetName: 'test',
  postalCode: '112233',
  id: 'address-1',
};

const VERSION = 33;
const TOKEN = 'any-token';

describe('test with updatePersonalData function', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('return updated data', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => MOCK_USER,
    });

    const result = await updateAddress(MOCK_ADDRESS, VERSION, TOKEN);

    expect(result).toEqual(MOCK_USER);
  });
});

describe('Error message', () => {
  it('should return message when response is not ok', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Invalid request' }),
    });

    const result = await updateAddress(MOCK_ADDRESS, VERSION, TOKEN);

    expect(result).toEqual({ message: 'Invalid request' });
  });

  it('should return default message when unknown error', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue('some error value');

    const result = await updateAddress(MOCK_ADDRESS, VERSION, TOKEN);

    expect(result).toEqual({ message: 'Unexpected error during updating address' });
  });
});
