import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { createInfoMessage } from '../../shared/components/info-message';
import { createA } from '../create-elements/create-tags';
import { LINK_CONFIG } from '../../shared/ui-config/link';
import { createCartItem } from '../../components/cart/item/item';
import { isFetchError } from '../type-guards/is-fetch-error';
import { CART_MESSAGES } from '../../pages/cart/constants';
import { costEventEmitter } from '../../helpers/total-cost-emitter';

export async function renderCartItems(itemsWrapper: HTMLDivElement): Promise<void> {
  itemsWrapper.replaceChildren();

  const cart = await getOrCreateCart();

  if (isFetchError(cart)) {
    return;
  }

  if (cart.lineItems.length === 0) {
    createInfoMessage(itemsWrapper, CART_MESSAGES.emptyCart);
    const catalogLink = createA(LINK_CONFIG.catalog);
    itemsWrapper.append(catalogLink);
  } else {
    for (const item of cart.lineItems) {
      createCartItem(item, itemsWrapper);
    }
    costEventEmitter.emit('total-cost', cart.totalPrice.centAmount);
  }
}
