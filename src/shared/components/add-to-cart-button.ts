import { createButton } from '../../utils/create-elements/create-tags';
import { addProductToCart } from '../../app/api/add-product-to-cart';
import { BUTTON } from '../styles';
import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { isFetchError } from '../../utils/type-guards/is-fetch-error';
import { createPopupMessage } from './popup';

const MESSAGES = {
  success: 'Product added in cart successfully',
  error: 'Can`t add product in cart',
};

export function addProductButton(attributes: Record<string, string>): HTMLButtonElement {
  return createButton({
    classes: [...BUTTON.general, ...BUTTON.generalHover, ...BUTTON.generalFocus, ...BUTTON.generalDisabled],
    attributes: attributes,
    events: {
      click: (event: Event) => {
        if (event.target instanceof HTMLButtonElement) {
          addButtonClick(event.target);
        }
      },
    },
    text: 'Add to Cart',
  });
}

async function addButtonClick(addButton: HTMLButtonElement): Promise<void> {
  const cart = await getOrCreateCart();

  if (isFetchError(cart)) {
    console.log(`cart error: ${cart.message}`);
    return;
  }

  if (addButton.dataset.id) {
    const updatedCart = await addProductToCart(cart, addButton.dataset.id);

    if (isFetchError(updatedCart)) {
      createPopupMessage(MESSAGES.error, false);
      return;
    } else {
      createPopupMessage(MESSAGES.success, true);
    }
  }

  addButton.disabled = true;
}
