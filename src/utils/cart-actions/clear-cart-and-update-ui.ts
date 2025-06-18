import { clearCart } from '../../app/api';
import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { calculateDiscountPriceForCart } from '../../helpers/calculate-discount-price';
import { costEventEmitter } from '../../helpers/total-cost-emitter';
import { createInfoMessage } from '../../shared/components/info-message';
import { createPopupMessage } from '../../shared/components/popup';
import { CART_MESSAGES } from '../../pages/cart/constants';
import { LINK_CONFIG } from '../../shared/ui-config/link';
import { createA } from '../create-elements/create-tags';
import { isFetchError } from '../type-guards/is-fetch-error';

export async function clearCartAndUpdateUI(itemsWrapper: HTMLDivElement, modal: HTMLElement): Promise<void> {
  const cart = await getOrCreateCart();

  if (!('id' in cart)) {
    createPopupMessage('Failed to clear the cart', false);
    return;
  }
  const cleanedCart = await clearCart(cart);
  itemsWrapper.replaceChildren();

  createInfoMessage(itemsWrapper, CART_MESSAGES.emptyCart);
  const catalogLink = createA(LINK_CONFIG.catalog);
  itemsWrapper.append(catalogLink);

  modal.style.display = 'none';

  if (isFetchError(cleanedCart)) {
    return;
  }

  const { originalPrice, discountedPrice } = calculateDiscountPriceForCart(cleanedCart);
  costEventEmitter.emit('total-cost', originalPrice, discountedPrice);
}
