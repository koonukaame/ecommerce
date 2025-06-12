import type { Cart } from '@commercetools/platform-sdk';
import { getToken } from '../auth-service';
import { API_URL, PROJECT_KEY } from '../constants';
import type { FetchError } from '../types';
import { getOrCreateCart } from './get-or-create-cart';

export async function applyPromocode(promocode: string): Promise<Cart | FetchError> {
  try {
    const cart = await getOrCreateCart();
    if (!('id' in cart)) {
      return { message: 'Failed to get or create cart' };
    }

    const token = getToken();
    if (!token) {
      return { message: 'No acces token found' };
    }

    const response = await fetch(`${API_URL}/${PROJECT_KEY}/me/carts/${cart.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: cart.version,
        actions: [{ action: 'addDiscountCode', code: promocode }],
      }),
    });

    if (!response.ok) {
      const error = await response.json();

      if (error?.errors?.[0]?.code === 'DiscountCodeNonApplicable') {
        return { message: `This "${promocode}" promocode doesn't exist` };
      }

      return { message: error.message || 'Failed to apply promocode' };
    }

    const updatedCart = await response.json();

    return updatedCart;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: 'Unexpected error while applying a promocode' };
  }
}
