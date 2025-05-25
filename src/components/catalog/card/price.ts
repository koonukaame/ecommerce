import { createSpan } from '../../../utils/create-elements/create-tags';
import { CENTS_IN_DOLLAR } from '../../../shared/constants';
import { CARD } from '../../../pages/catalog/constants';

export function createPriceComponent(productDiscount: number, productPrice: number): HTMLSpanElement[] {
  const isDiscount = productDiscount > 0;

  const price = createSpan({
    text: `${productPrice / CENTS_IN_DOLLAR} $`,
    classes: [...CARD.price, ...(isDiscount ? ['line-through'] : [])],
  });
  const discount = isDiscount
    ? createSpan({ text: `${productDiscount / CENTS_IN_DOLLAR} $`, classes: CARD.discount })
    : undefined;

  const priceChildren = [price];
  if (discount) {
    priceChildren.push(discount);
  }

  return priceChildren;
}
