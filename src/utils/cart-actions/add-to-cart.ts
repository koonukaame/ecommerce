import { addProductToCart } from '../../app/api/add-product-to-cart';
import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { createPopupMessage } from '../../shared/components/popup';
import { CART_MESSAGES } from '../../shared/constants';
import { isFetchError } from '../type-guards/is-fetch-error';

export async function addToCart(addButton: HTMLButtonElement): Promise<void> {
  const cart = await getOrCreateCart();

  if (isFetchError(cart)) {
    return;
  }

  if (addButton.dataset.id) {
    const updatedCart = await addProductToCart(cart, addButton.dataset.id);

    if (isFetchError(updatedCart)) {
      createPopupMessage(CART_MESSAGES.ADD_ERROR, false);
      return;
    } else {
      createPopupMessage(CART_MESSAGES.ADD_SUCCESS, true);
    }
  }

  addButton.disabled = true;
}
