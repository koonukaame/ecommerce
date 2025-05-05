import { getAuthToken } from "../ecommerce/get-auth-token";
import { type Customer } from "../types";

const API_URL = import.meta.env.VITE_API_URL;
const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;

export async function loginUser(username: string, password: string): Promise<Customer | undefined> {
  try {
    const accessToken: string | undefined = await getAuthToken(username, password);

    if (!accessToken) {
      return;
    }
  
    const userResponse: Response = await fetch(`${API_URL}/${PROJECT_KEY}/me`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: 'GET'
    });
  
    const response: Customer = await userResponse.json();
    console.log(response);

    return response;
  } catch {
    return;
  }
}
