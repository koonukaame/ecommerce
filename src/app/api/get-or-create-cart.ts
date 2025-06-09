import type { Cart } from '@commercetools/platform-sdk';
import { API_URL, PROJECT_KEY } from '../constants';
import type { FetchError } from '../types';

export async function getOrCreateCart(token: string): Promise<Cart | FetchError> {
  try {
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
      return cartsData.results[0];
    }

    const creatCart = await fetch(`${API_URL}/${PROJECT_KEY}/me/carts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currency: 'USD' }),
    });

    if (!creatCart.ok) {
      const error = await creatCart.json();
      return { message: error.message || 'Failed to create a new cart' };
    }

    const newCart = await creatCart.json();
    console.log('Создал новую корзину', newCart);

    return newCart;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: 'Unexpected error during getting a cart' };
  }
}
