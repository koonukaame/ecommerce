import { QUANTITY } from '../../../pages/cart/constants';
import { FULL_PERCENT, DECIMAL_PLACES } from '../../../shared/constants';
import { createDiv, createButton, createSpan } from '../../../utils/create-elements/create-tags';
import { decreaseQuantityHandler } from '../../../utils/quantity-handlers/decrease-quantity-handler';
import { increaseQuantityHandler } from '../../../utils/quantity-handlers/increase-quantity-handler';
import { cartEventEmitter } from '../items-wrapper';
import { isQuantityData } from '../../../utils/type-guards/is-quantity-data';

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
      click: () => decreaseQuantityHandler(quantityText, lineItemId),
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
      click: () => increaseQuantityHandler(quantityText, lineItemId),
    },
  });

  cartEventEmitter.subscribe('item-quantity', (data: unknown) => {
    if (isQuantityData(data) && data.lineItemId === lineItemId) {
      quantityText.textContent = data.quantity.toString();
      const price = data.discountedPrice ?? data.totalPrice;
      const total = `Total: ${(price / FULL_PERCENT).toFixed(DECIMAL_PLACES)} $`;
      priceBlock.textContent = total;

      console.log(data);
    }
  });

  return quantityWrapper;
}
