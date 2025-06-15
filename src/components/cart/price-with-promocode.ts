import { createSpan } from '../../utils/create-elements/create-tags';
import { formatPrice } from '../../helpers/format-price';
import { TOTAL_PRICE } from '../../pages/cart/constants';

export function createPriceWithPromocode(span: HTMLSpanElement, originalPrice: number, discountedPrice?: number): void {
  span.replaceChildren();
  if (discountedPrice !== undefined && discountedPrice < originalPrice) {
    const cartTotal = createSpan({
      text: 'Cart total: ',
    });
    const originalPriceElement = createSpan({
      text: `${formatPrice(originalPrice)}`,
      classes: TOTAL_PRICE.originalPrice,
    });

    const discountedPriceElement = createSpan({
      text: formatPrice(discountedPrice),
      classes: TOTAL_PRICE.discountedPrice,
    });

    span.append(cartTotal, originalPriceElement, discountedPriceElement);
  } else {
    span.textContent = originalPrice === 0 ? '' : `Cart total: ${formatPrice(Number(originalPrice))}`;
  }
}
