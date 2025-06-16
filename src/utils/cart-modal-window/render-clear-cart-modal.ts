import { clearCart } from '../../app/api';
import { getOrCreateCart } from '../../app/api/get-or-create-cart';
import { createInfoMessage } from '../../shared/components/info-message';
import { createPopupMessage } from '../../shared/components/popup';
import { CART_MESSAGES } from '../../pages/cart/constants';
import { BUTTON } from '../../shared/styles';
import { LINK_CONFIG } from '../../shared/ui-config/link';
import { createA, createButton, createDiv, createH3, createP } from '../create-elements/create-tags';
import { costEventEmitter } from '../../helpers/total-cost-emitter';
import { calculateDiscountPriceForCart } from '../../helpers/calculate-discount-price';
import { isFetchError } from '../type-guards/is-fetch-error';

const MODAL_CLASSES = {
  wrapper: [
    'fixed',
    'inset-0',
    'bg-black/50',
    'backdrop-blur-sm',
    'z-50',
    'flex',
    'items-center',
    'justify-center',
    'p-4',
    'overflow-hidden',
  ],
  container: [
    'bg-white',
    'shadow-2xl',
    'max-w-md',
    'w-full',
    'transform',
    'transition-all',
    'duration-300',
    'scale-100',
  ],
  content: ['p-8', 'text-center'],
  title: ['text-2xl', 'font-bold', 'text-gray-900', 'mb-4'],
  message: ['text-gray-700', 'mb-6'],
  buttoncContainer: ['flex', 'gap-4'],
  button: [...BUTTON.general, ...BUTTON.generalFocus, ...BUTTON.generalHover],
};

// eslint-disable-next-line max-lines-per-function
export function renderClearCartModal(itemsWrapper: HTMLDivElement): HTMLDivElement {
  const modal = createDiv({ parent: document.body, classes: MODAL_CLASSES.wrapper });
  const container = createDiv({ parent: modal, classes: MODAL_CLASSES.container });
  const content = createDiv({ parent: container, classes: MODAL_CLASSES.content });

  createH3({
    parent: content,
    classes: MODAL_CLASSES.title,
    text: 'Clear Cart?',
  });

  createP({
    parent: content,
    classes: MODAL_CLASSES.message,
    text: 'Are you sure you want to remove all items from your cart? This action cannot be undone.',
  });

  const buttonsContainer = createDiv({ parent: content, classes: MODAL_CLASSES.buttoncContainer });

  createButton({
    parent: buttonsContainer,
    classes: ['!text-gray-700', 'border-1', 'border-gray-300', 'bg-white', ...MODAL_CLASSES.button],
    text: 'Close',
    events: {
      click: () => (modal.style.display = 'none'),
    },
  });

  createButton({
    parent: buttonsContainer,
    classes: MODAL_CLASSES.button,
    text: 'Clear Cart',
    events: {
      click: async () => {
        const cart = await getOrCreateCart();

        if (!('id' in cart)) {
          createPopupMessage('Failed to clear the cart', false);
          return;
        }
        const cleanedCart = await clearCart(cart);
        console.log('Корзина очищена', cleanedCart);
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
      },
    },
  });

  return modal;
}
