import { createDiv } from '../../utils/create-elements/create-tags';
import { CART } from '../../pages/cart/constants';
import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { createCartItem } from './item/item';

export async function createProductsWrapper(layout: HTMLDivElement): Promise<HTMLDivElement> {
  const itemsWrapper = createDiv({ parent: layout, classes: CART.itemsWrapper });

  const cart = await getOrCreateCart();

  if ('message' in cart) {
    return itemsWrapper;
  }

  for (const item of cart.lineItems) {
    createCartItem(item, itemsWrapper);
  }

  return itemsWrapper;
}
