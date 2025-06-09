import { API_URL, PROJECT_KEY } from '../constants';
import { type FetchError } from '../types';
import type { Cart } from '@commercetools/platform-sdk';

export async function addProductToCart(
  token: string,
  cartId: string,
  cartVersion: number,
  productId: string,
): Promise<Cart | FetchError> {
  try {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me/carts/${cartId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: cartVersion,
        actions: [
          {
            action: 'addLineItem',
            productId,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();

      return { message: error.message || 'Failed to add the product to cart' };
    }

    const updatedCart = await response.json();
    console.log('Товар добавлен в корзину', updatedCart);

    return updatedCart;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: 'Unexpected error during getting a cart' };
  }
}
