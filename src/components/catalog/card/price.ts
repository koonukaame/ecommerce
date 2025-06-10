import { createDiv, createSpan } from '../../../utils/create-elements/create-tags';
import { CENTS_IN_DOLLAR } from '../../../shared/constants';
import { CARD } from '../../../pages/catalog/constants';

export function createPriceComponent(productDiscount: number, productPrice: number): HTMLDivElement {
  const isDiscount = productDiscount > 0;

  const priceWrapper = createDiv({ classes: CARD.priceWrapper });

  createSpan({
    text: `${productPrice / CENTS_IN_DOLLAR} $`,
    classes: [...CARD.price, ...(isDiscount ? ['line-through'] : [])],
    parent: priceWrapper,
  });

  if (isDiscount) {
    createSpan({
      text: `${productDiscount / CENTS_IN_DOLLAR} $`,
      classes: CARD.discount,
      parent: priceWrapper,
    });
  }

  return priceWrapper;
}
