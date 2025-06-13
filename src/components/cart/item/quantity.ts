import { QUANTITY } from '../../../pages/cart/constants';
import { FULL_PERCENT } from '../../../shared/constants';
import { createDiv, createButton, createSpan } from '../../../utils/create-elements/create-tags';
import { updateQuantity } from '../../../utils/update-quantity/update-quantity';
import { cartEventEmitter } from '../items-wrapper';

export function createQuantityComponent(
  quantity: number,
  lineItemId: string,
  priceBlock: HTMLSpanElement,
): HTMLDivElement {
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

  cartEventEmitter.subscribe('item-quantity', (data: unknown) => {
    if (isQuantityEventData(data) && data.lineItemId === lineItemId) {
      quantityText.textContent = data.quantity.toString();

      const price = data.discountedPrice ?? data.totalPrice;
      const total = (price * data.quantity) / FULL_PERCENT + ' $';
      priceBlock.textContent = total;
    }
  });

  return quantityWrapper;
}

function isQuantityEventData(data: unknown): data is {
  lineItemId: string;
  quantity: number;
  totalPrice: number;
  discountedPrice?: number;
} {
  return (
    typeof data === 'object' &&
    data !== null &&
    'lineItemId' in data &&
    typeof data.lineItemId === 'string' &&
    'quantity' in data &&
    typeof data.quantity === 'number' &&
    'totalPrice' in data &&
    typeof data.totalPrice === 'number' &&
    ('discountedPrice' in data ? typeof data.discountedPrice === 'number' : true)
  );
}
