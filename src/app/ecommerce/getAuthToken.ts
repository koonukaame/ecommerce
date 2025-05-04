const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const AUTH_URL = import.meta.env.VITE_AUTH_URL;
const API_URL = import.meta.env.VITE_API_URL;
const SCOPES = import.meta.env.VITE_SCOPES;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

export async function getAuthToken(email: string, password: string) {
  try {
    const tokenResponse = await fetch(`${AUTH_URL}/oauth/${PROJECT_KEY}/customers/token`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        username: email,
        password: password,
        scope: SCOPES,
      }),
    });

    const token = await tokenResponse.json();
    console.log(token.access_token)
    return token.access_token;
  } catch (error) {
    console.log(error);
  }
}