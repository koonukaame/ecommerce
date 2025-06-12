import { changeProductQuantity } from '../../app/api/change-product-quantity';
import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { cartEventEmitter } from '../../components/cart/items-wrapper';
import { isFetchError } from '../type-guards/is-fetch-error';

export async function updateQuantity(lineItemId: string, quantity: number): Promise<void> {
  const cart = await getOrCreateCart();
  if (isFetchError(cart)) {
    return;
  }

  await changeProductQuantity(cart, lineItemId, quantity);

  cartEventEmitter.emit('item-change');
}
