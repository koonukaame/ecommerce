import { createButton } from '../../utils/create-elements/create-tags';
import { BUTTON } from '../styles';
import { isFetchError } from '../../utils/type-guards/is-fetch-error';
import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { removeProductFromCart } from '../../app/api/remove-product-from-cart';
import { createPopupMessage } from './popup';

const MESSAGES = {
  success: 'Product removed from cart successfully',
  error: 'Can`t remove product from cart',
};

export function removeProductButton(attributes: Record<string, string>): HTMLButtonElement {
  return createButton({
    classes: [
      ...BUTTON.general,
      ...BUTTON.generalHover,
      ...BUTTON.generalFocus,
      ...BUTTON.generalDisabled,
      'mt-[15px]',
    ],
    attributes: attributes,
    events: {
      click: (event: Event) => {
        if (event.target instanceof HTMLButtonElement) {
          buttonClick(event.target);
        }
      },
    },
    text: 'Remove from Cart',
  });
}

async function buttonClick(removeButton: HTMLButtonElement): Promise<void> {
  const cart = await getOrCreateCart();

  if (isFetchError(cart)) {
    console.log(`cart error: ${cart.message}`);
    return;
  }

  if (removeButton.dataset.id) {
    const updatedCart = await removeProductFromCart(cart, removeButton.dataset.id);

    if (isFetchError(updatedCart)) {
      createPopupMessage(MESSAGES.error, false);
      return;
    } else {
      createPopupMessage(MESSAGES.success, true);
    }
    removeButton.disabled = true;
  }
}
