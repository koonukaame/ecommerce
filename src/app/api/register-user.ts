import { getAnonymousToken } from "../ecommerce/get-anonymous-token";

export async function registerUser(): Promise<void> {
  getAnonymousToken();
}