import type { Cart } from '@commercetools/platform-sdk';
import { getToken } from '../auth-service';
import { API_URL, PROJECT_KEY } from '../constants';
import type { FetchError } from '../types';
import { initCartIndicator } from '../../utils/init-cart-indicator';

export async function removeProductFromCart(cart: Cart, productId: string): Promise<Cart | FetchError> {
  try {
    const token = getToken();

    if (!token) {
      return { message: 'Failed to get token' };
    }

    const lineItem = cart.lineItems.find((item) => item.productId === productId);

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
            action: 'removeLineItem',
            lineItemId: lineItem?.id,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();

      return { message: error.message || 'Failed to remove a product from the cart' };
    }

    const updatedCart = await response.json();
    console.log('Товар удален из корзины', updatedCart);

    initCartIndicator(updatedCart);

    return updatedCart;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: 'Unexpected error while removing a product from the cart' };
  }
}
