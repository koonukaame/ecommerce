import { MODAL_CLASSES } from '../../../pages/cart/constants';
import { clearCartAndUpdateUI } from '../../../utils/cart-actions/clear-cart-and-update-ui';
import { createButton, createDiv, createH3, createP } from '../../../utils/create-elements/create-tags';

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

  const buttonsContainer = createDiv({ parent: content, classes: MODAL_CLASSES.buttonsContainer });

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
      click: async () => clearCartAndUpdateUI(itemsWrapper, modal),
    },
  });

  return modal;
}
