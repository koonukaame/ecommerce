import { createButton, createDiv } from '../../utils/create-elements/create-tags';
import { CART } from '../../pages/cart/constants';
import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { createCartItem } from './item/item';
import { createInfoMessage } from '../../shared/components/info-message';
import { BUTTONS_CONFIG } from '../../shared/ui-config/button';

export async function createProductsWrapper(layout: HTMLDivElement): Promise<HTMLDivElement> {
  const itemsWrapper = createDiv({ parent: layout, classes: CART.itemsWrapper });

  const cart = await getOrCreateCart();

  if ('message' in cart) {
    return itemsWrapper;
  }

  if (cart.lineItems.length === 0) {
    createInfoMessage(itemsWrapper, 'Your cart is empty. Start shopping and fill it with some amazing items!');
    const catalogButton = createButton(BUTTONS_CONFIG.gotoCatalog);
    itemsWrapper.append(catalogButton);
  } else {
    for (const item of cart.lineItems) {
      createCartItem(item, itemsWrapper);
    }
  }

  return itemsWrapper;
}
