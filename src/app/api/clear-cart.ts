import type { Cart } from '@commercetools/platform-sdk';
import { getToken } from '../auth-service';
import { API_URL, PROJECT_KEY } from '../constants';
import type { FetchError } from '../types';

export async function clearCart(cart: Cart): Promise<Cart | FetchError> {
  try {
    const token = getToken();

    if (cart.lineItems.length === 0) {
      console.log('Корзина уже пустая');

      return cart;
    }

    const actions = cart.lineItems.map((item) => ({
      action: 'removeLineItem',
      lineItemId: item.id,
      quantity: item.quantity,
    }));

    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me/carts/${cart.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: cart.version,
        actions,
      }),
    });

    if (!response.ok) {
      const error = await response.json();

      return { message: error.message || 'Failed to clear the cart' };
    }

    const updatedCart = await response.json();
    console.log('Корзина очищена', updatedCart);

    return updatedCart;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: 'Unexpected error while clearing the cart' };
  }
}
