import type { Cart } from '@commercetools/platform-sdk';
import { API_URL, PROJECT_KEY } from '../constants';
import type { FetchError } from '../types';
import { initCartIndicator } from '../../utils/init-cart-indicator';
import { getToken, isTokenExpired, refreshAccessToken } from '../auth-service';

export async function getOrCreateCart(): Promise<Cart | FetchError> {
  try {
    if (isTokenExpired()) {
      await refreshAccessToken();
    }
    const token = getToken();
    if (!token) {
      return { message: 'Failed to get token' };
    }
    const existingCart = await fetch(`${API_URL}/${PROJECT_KEY}/me/carts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!existingCart.ok) {
      const error = await existingCart.json();
      return { message: error.message || 'Failed to get the existing cart' };
    }

    const cartsData = await existingCart.json();
    if (cartsData.results && cartsData.results.length > 0) {
      console.log('Нашли существующую корзину', cartsData.results[0]);
      initCartIndicator(cartsData.results[0]);
      return cartsData.results[0];
    }

    const createCart = await fetch(`${API_URL}/${PROJECT_KEY}/me/carts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currency: 'USD' }),
    });

    if (!createCart.ok) {
      const error = await createCart.json();
      return { message: error.message || 'Failed to create a new cart' };
    }

    const newCart = await createCart.json();
    console.log('Создал новую корзину', newCart);

    initCartIndicator(newCart);

    return newCart;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: 'Unexpected error while getting a cart' };
  }
}
