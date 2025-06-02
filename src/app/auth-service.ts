import { getAnonymousToken } from './ecommerce/get-anonymous-token';
import { getAuthToken } from './ecommerce/get-auth-token';

const TOKEN_KEY = 'auth_token';
const IS_ANONYMOUS_KEY = 'is_anonymous';

export type TokenResponse = {
  access_token: string;
  expires_in: number;
};

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAnonymous(): boolean {
  return JSON.parse(localStorage.getItem(IS_ANONYMOUS_KEY) || 'true');
}

export function saveToken(token: string, isAnonymous: boolean): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(IS_ANONYMOUS_KEY, JSON.stringify(isAnonymous));
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(IS_ANONYMOUS_KEY);
}

export async function initAnonymousSession(): Promise<void> {
  if (!getToken()) {
    const access_token = await getAnonymousToken();

    if (typeof access_token === 'string') {
      saveToken(access_token, true);
    }
  }
}

export async function loginAndSaveToken(email: string, password: string): Promise<void> {
  const access_token = await getAuthToken(email, password);

  if (typeof access_token === 'string') {
    saveToken(access_token, false);
  }
}

export async function logoutAndSaveAnonToken(): Promise<void> {
  clearToken();

  const access_token = await getAnonymousToken();

  if (typeof access_token === 'string') {
    saveToken(access_token, true);
  }
}
