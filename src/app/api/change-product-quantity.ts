import type { Cart } from '@commercetools/platform-sdk';
import type { FetchError } from '../types';
import { isTokenExpired, refreshAccessToken, getToken } from '../auth-service';
import { API_URL, PROJECT_KEY } from '../constants';

export async function changeProductQuantity(
  cart: Cart,
  lineItemId: string,
  quantity: number,
): Promise<Cart | FetchError> {
  try {
    if (isTokenExpired()) {
      await refreshAccessToken();
    }

    const token = getToken();
    if (!token) {
      return { message: 'Failed to get token' };
    }

    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me/carts/${cart.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: cart.version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId,
            quantity,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { message: error.message || 'Failed to change product quantity' };
    }

    const updatedCart = await response.json();

    return updatedCart;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: 'Unexpected error while changing product quantity in cart' };
  }
}
