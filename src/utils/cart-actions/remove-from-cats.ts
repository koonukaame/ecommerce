import { removeProductFromCart } from '../../app/api';
import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { createPopupMessage } from '../../shared/components/popup';
import { CART_MESSAGES } from '../../shared/constants';
import { isFetchError } from '../type-guards/is-fetch-error';

export async function removeFromCart(removeButton: HTMLButtonElement): Promise<void> {
  const cart = await getOrCreateCart();

  if (isFetchError(cart)) {
    console.log(`cart error: ${cart.message}`);
    return;
  }

  if (removeButton.dataset.id) {
    const updatedCart = await removeProductFromCart(cart, removeButton.dataset.id);

    if (isFetchError(updatedCart)) {
      createPopupMessage(CART_MESSAGES.REMOVE_ERROR, false);
      return;
    } else {
      createPopupMessage(CART_MESSAGES.REMOVE_SUCCESS, true);
    }
    removeButton.disabled = true;
  }
}
