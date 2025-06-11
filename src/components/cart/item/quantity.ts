import { QUANTITY } from '../../../pages/cart/constants';
import { createDiv, createButton, createSpan } from '../../../utils/create-elements/create-tags';

export function createQuantityComponent(quantity: number): HTMLDivElement {
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
  });

  createSpan({
    parent: controls,
    text: quantity.toString(),
  });

  createButton({
    parent: controls,
    classes: QUANTITY.controlsBtn,
    text: '+',
  });

  return quantityWrapper;
}
