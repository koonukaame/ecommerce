import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY, SCOPES } from "../constants";
import { type AuthTokenError, type AuthTokenInfo, type AuthTokenSuccess } from "../types";

export async function getAnonymousToken(): Promise<AuthTokenError | AuthTokenSuccess> {
  try {
    const anonymousId = crypto.randomUUID();

    const tokenResponse: Response = await fetch(`${AUTH_URL}/oauth/${PROJECT_KEY}/anonymous/token`, {
      body: new URLSearchParams({
        anonymous_id: anonymousId,
        grant_type: 'client_credentials',
        scope: SCOPES,
      }),
      headers: {
        'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const data: AuthTokenInfo = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return { message: data.message || 'Anonymous token fetch failed' };
    }

    return data.access_token;
  } catch {
    return { message: 'Network or parsing error during anonymous authentication' };
  }
}