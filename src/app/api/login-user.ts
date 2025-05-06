import { getAuthToken } from "../ecommerce/get-auth-token";
import { type AuthTokenError, type Customer } from "../types";

const API_URL = import.meta.env.VITE_API_URL;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

export async function loginUser(username: string, password: string): Promise<AuthTokenError | Customer>  {
  try {
    const tokenResponse = await getAuthToken(username, password);

    if (typeof tokenResponse !== "string") {
      return tokenResponse;
    }
  
    const userResponse: Response = await fetch(`${API_URL}/${PROJECT_KEY}/me`, {
      headers: {
        "Authorization": `Bearer ${tokenResponse}`,
        "Content-Type": "application/json",
      },
      method: 'GET'
    });
  
    if (!userResponse.ok) {
      const error = await userResponse.json();

      return { message: error.message || "Failed to fetch user data" };
    }

    const response: Customer = await userResponse.json();

    return response;
  } catch {
    return { message: "Unexpected error during login"}
  }
}
