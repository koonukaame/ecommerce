import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { createInfoMessage } from '../../shared/components/info-message';
import { createA, createButton } from '../create-elements/create-tags';
import { LINK_CONFIG } from '../../shared/ui-config/link';
import { createCartItem } from '../../components/cart/item/item';
import { isFetchError } from '../type-guards/is-fetch-error';
import { CART_MESSAGES } from '../../pages/cart/constants';

import { costEventEmitter } from '../../helpers/total-cost-emitter';
import { calculateDiscountPriceForCart } from '../../helpers/calculate-discount-price';
import { BUTTON } from '../../shared/styles';
import { renderClearCartModal } from '../cart-modal-window/render-clear-cart-modal';

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
      classes: [
        'mt-[10px]',
        'mb-[10px]',
        'self-start',
        '!w-[200px]',
        '!h-[34px]',
        'text-[12px]',
        ...BUTTON.general,
        ...BUTTON.generalFocus,
        ...BUTTON.generalHover,
      ],
      events: {
        click: () => renderClearCartModal(itemsWrapper),
      },
      text: 'clear cart',
    });

    const { originalPrice, discountedPrice } = calculateDiscountPriceForCart(cart);
    costEventEmitter.emit('total-cost', originalPrice, discountedPrice);
  }
}
