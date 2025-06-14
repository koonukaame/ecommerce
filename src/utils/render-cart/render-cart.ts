import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { createInfoMessage } from '../../shared/components/info-message';
import { createA, createButton } from '../create-elements/create-tags';
import { LINK_CONFIG } from '../../shared/ui-config/link';
import { createCartItem } from '../../components/cart/item/item';
import { isFetchError } from '../type-guards/is-fetch-error';
import { CART_MESSAGES } from '../../pages/cart/constants';
import { createPopupMessage } from '../../shared/components/popup';
import { clearCart } from '../../app/api';
import { BUTTONS_CONFIG } from '../../shared/ui-config/button';

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

    const button = createButton(BUTTONS_CONFIG.clearCart);
    button.style.alignSelf = 'flex-end';

    itemsWrapper.append(button);

    button.addEventListener('click', async () => {
      clean();
    });

    async function clean(): Promise<void> {
      const cart = await getOrCreateCart();

      if (!('id' in cart)) {
        createPopupMessage('Failed to clear the cart', false);
        return;
      }
      const cleanedCart = await clearCart(cart);
      console.log(cleanedCart);
      itemsWrapper.replaceChildren();

      createInfoMessage(itemsWrapper, CART_MESSAGES.emptyCart);
      const catalogLink = createA(LINK_CONFIG.catalog);
      itemsWrapper.append(catalogLink);
    }
  }
}
