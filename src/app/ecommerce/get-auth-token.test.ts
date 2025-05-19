import { describe, expect, it, vi } from 'vitest';

const invalidAuthUrl = { message: 'Network or parsing error during authentication' };

describe('test with wrong AUTH_URL', () => {
  it('use wrong AUTH_URL', async () => {
    vi.stubEnv('VITE_AUTH_URL', 'wrong_auth_url');
    vi.resetModules();

    const { getAuthToken } = await import('./get-auth-token.ts');

    const result = await getAuthToken('alex@alex.ru', 'alex');

    expect(result).toEqual(invalidAuthUrl);
  });
});
