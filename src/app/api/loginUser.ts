import { getAuthToken } from "../ecommerce/getAuthToken";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const AUTH_URL = import.meta.env.VITE_AUTH_URL;
const API_URL = import.meta.env.VITE_API_URL;
const SCOPES = import.meta.env.VITE_SCOPES;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

export async function loginUser(username, password) {
  const accessToken = await getAuthToken(username, password);

  const userResponse = await fetch(`${API_URL}/${PROJECT_KEY}/me`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    }
  });

  const response = await userResponse.json();
  console.log(response);
  return response;
}
