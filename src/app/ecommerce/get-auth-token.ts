import { type AuthTokenError, type AuthTokenInfo, type AuthTokenSuccess } from '../types'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const AUTH_URL = import.meta.env.VITE_AUTH_URL;
const SCOPES = import.meta.env.VITE_SCOPES;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

export async function getAuthToken(email: string, password: string): Promise<AuthTokenError | AuthTokenSuccess> {
  try {
    const tokenResponse: Response = await fetch(`${AUTH_URL}/oauth/${PROJECT_KEY}/customers/token`, {
      body: new URLSearchParams({
        grant_type: "password",
        password: password,
        scope: SCOPES,
        username: email,
      }),
      headers: {
        "Authorization": `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const data: AuthTokenInfo = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      return { message: data.message || "Authentication failed" };
    }

    return data.access_token;
  } catch {
    return { message: "Network or parsing error during authentication" };
  }
}