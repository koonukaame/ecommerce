import { toggleClassesOnRedirect } from '../helpers/toggle-classes-on-redirect';
import { EXPIRES_AT_KEY, IS_ANONYMOUS_KEY, ONE_SECOND, REFRESH_TOKEN_KEY, TOKEN_KEY } from '../shared/constants';
import { appState } from './app-state';
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET } from './constants';
import { getAnonymousToken } from './ecommerce/get-anonymous-token';
import { getAuthToken } from './ecommerce/get-auth-token';
import type { TokenResponse } from './types';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAnonymous(): boolean {
  return JSON.parse(localStorage.getItem(IS_ANONYMOUS_KEY) || 'true');
}

export function saveToken(token: string, isAnonymous: boolean, refreshToken: string, expiresIn: number): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(IS_ANONYMOUS_KEY, JSON.stringify(isAnonymous));
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

  const expiresAt = Date.now() + expiresIn * ONE_SECOND;

  localStorage.setItem(EXPIRES_AT_KEY, expiresAt.toString());
}

export function isTokenExpired(): boolean {
  const expiresAt = Number(localStorage.getItem(EXPIRES_AT_KEY) || '0');
  return Date.now() > expiresAt;
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(IS_ANONYMOUS_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
}

export async function initAnonymousSession(): Promise<void> {
  if (!getToken() || isTokenExpired()) {
    const response = await getAnonymousToken();

    if ('access_token' in response && typeof response.access_token === 'string') {
      saveToken(response.access_token, true, response.refresh_token || '', response.expires_in);
    }
  }
}

export async function loginAndSaveToken(email: string, password: string): Promise<void> {
  const response = await getAuthToken(email, password);

  if ('access_token' in response && typeof response.access_token === 'string') {
    saveToken(response.access_token, false, response.refresh_token, response.expires_in);
  }
}

export async function logoutAndSaveAnonToken(): Promise<void> {
  clearToken();

  const response = await getAnonymousToken();

  if ('access_token' in response && typeof response.access_token === 'string') {
    saveToken(response.access_token, true, response.refresh_token, response.expires_in);
  }
}

export async function refreshAccessToken(): Promise<void> {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    await logoutAndSaveAnonToken();
    appState.isLogined = false;
    toggleClassesOnRedirect(appState.isLogined, appState.currentPage);
    return;
  }

  const response = await fetch(`${AUTH_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    await logoutAndSaveAnonToken();
    return;
  }

  const data: TokenResponse = await response.json();
  const wasAnonymous = isAnonymous();

  saveToken(data.access_token, wasAnonymous, data.refresh_token || '', data.expires_in);
}

export async function initAuth(): Promise<void> {
  clearToken();
  await initAnonymousSession();
}
