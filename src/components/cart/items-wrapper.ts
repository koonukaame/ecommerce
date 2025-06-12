import { createA, createDiv } from '../../utils/create-elements/create-tags';
import { CART, CART_MESSAGES } from '../../pages/cart/constants';
import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { createCartItem } from './item/item';
import { createInfoMessage } from '../../shared/components/info-message';
import { LINK_CONFIG } from '../../shared/ui-config/link';

export async function createProductsWrapper(layout: HTMLDivElement): Promise<HTMLDivElement> {
  const itemsWrapper = createDiv({ parent: layout, classes: CART.itemsWrapper });

  const cart = await getOrCreateCart();

  if ('message' in cart) {
    return itemsWrapper;
  }

  if (cart.lineItems.length === 0) {
    createInfoMessage(itemsWrapper, CART_MESSAGES.emptyCart);
    const catalogLink = createA(LINK_CONFIG.catalog);
    itemsWrapper.append(catalogLink);
  } else {
    for (const item of cart.lineItems) {
      createCartItem(item, itemsWrapper);
    }
  }

  return itemsWrapper;
}
