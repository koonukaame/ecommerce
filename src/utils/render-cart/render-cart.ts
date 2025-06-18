import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { createInfoMessage } from '../../shared/components/info-message';
import { createA, createButton } from '../create-elements/create-tags';
import { LINK_CONFIG } from '../../shared/ui-config/link';
import { createCartItem } from '../../components/cart/item/item';
import { isFetchError } from '../type-guards/is-fetch-error';
import { CART_MESSAGES, MODAL } from '../../pages/cart/constants';
import { costEventEmitter } from '../../helpers/total-cost-emitter';
import { calculateDiscountPriceForCart } from '../../helpers/calculate-discount-price';
import { renderClearCartModal } from '../../components/cart/modal-window/render-clear-cart-modal';

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

    createButton({
      parent: itemsWrapper,
      classes: MODAL.openModalButton,
      events: {
        click: () => renderClearCartModal(itemsWrapper),
      },
      text: 'clear cart',
    });

    const { originalPrice, discountedPrice } = calculateDiscountPriceForCart(cart);
    costEventEmitter.emit('total-cost', originalPrice, discountedPrice);
  }
}
