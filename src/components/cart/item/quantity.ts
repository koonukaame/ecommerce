import { QUANTITY } from '../../../pages/cart/constants';
import { createDiv, createButton, createSpan } from '../../../utils/create-elements/create-tags';
import { updateQuantity } from '../../../utils/update-quantity/update-quantity';

export function createQuantityComponent(quantity: number, lineItemId: string): HTMLDivElement {
  const quantityWrapper = createDiv({
    classes: QUANTITY.wrapper,
    text: 'Amount:',
  });

  const controls = createDiv({
    parent: quantityWrapper,
    classes: QUANTITY.controls,
  });

  createButton({
    parent: controls,
    classes: QUANTITY.controlsBtn,
    text: '-',
    events: {
      click: () => {
        const current = Number(quantityText.textContent);
        const updated = current - 1;
        if (updated >= 0) {
          updateQuantity(lineItemId, updated);
        }
      },
    },
  });

  const quantityText = createSpan({
    parent: controls,
    text: quantity.toString(),
  });

  createButton({
    parent: controls,
    classes: QUANTITY.controlsBtn,
    text: '+',
    events: {
      click: () => {
        const current = Number(quantityText.textContent);
        updateQuantity(lineItemId, current + 1);
      },
    },
  });

  return quantityWrapper;
}
