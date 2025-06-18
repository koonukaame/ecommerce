import { describe, expect, it, vi } from 'vitest';

const invalidAuthUrl = { message: 'Network or parsing error during anonymous authentication' };

describe('test with wrong AUTH_URL', () => {
  it('use wrong AUTH_URL', async () => {
    vi.stubEnv('VITE_AUTH_URL', 'wrong_auth_url');
    vi.resetModules();

    const { getAnonymousToken } = await import('./get-anonymous-token.ts');

    const result = await getAnonymousToken();

    expect(result).toEqual(invalidAuthUrl);
  });
});
