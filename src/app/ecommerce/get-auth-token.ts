import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY, SCOPES } from '../constants';
import { type AuthTokenError, type AuthTokenInfo, type AuthTokenSuccess } from '../types'

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