import { changeProductQuantity } from '../../app/api/change-product-quantity';
import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { cartEventEmitter } from '../../components/cart/items-wrapper';
import { isFetchError } from '../type-guards/is-fetch-error';
import { initCartIndicator } from '../init-cart-indicator';

export async function updateQuantity(lineItemId: string, quantity: number): Promise<void> {
  const cart = await getOrCreateCart();
  if (isFetchError(cart)) {
    return;
  }

  const changedCart = await changeProductQuantity(cart, lineItemId, quantity);
  if (isFetchError(changedCart)) {
    return;
  }

  const updatedItem = changedCart.lineItems.find((item) => item.id === lineItemId);
  if (!updatedItem) {
    return;
  }

  cartEventEmitter.emit('item-quantity', {
    lineItemId: updatedItem.id,
    quantity: updatedItem.quantity,
    totalPrice: updatedItem.totalPrice.centAmount,
  });

  initCartIndicator(changedCart);
}
