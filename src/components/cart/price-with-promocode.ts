import { createSpan } from '../../utils/create-elements/create-tags';
import { formatPrice } from '../../helpers/format-price';

export function createPriceWithPromocode(span: HTMLSpanElement, originalPrice: number, discountedPrice?: number): void {
  span.replaceChildren();
  if (discountedPrice !== undefined && discountedPrice < originalPrice) {
    const cartTotal = createSpan({
      text: 'Cart total: ',
    });
    const originalPriceElement = createSpan({
      text: `${formatPrice(originalPrice)}`,
      classes: ['line-through', 'text-[#252525]'],
    });

    const discounterPriceElement = createSpan({
      text: formatPrice(discountedPrice),
      classes: ['text-red-600/90', 'pl-1'],
    });

    span.append(cartTotal, originalPriceElement, discounterPriceElement);
  } else {
    span.textContent = originalPrice === 0 ? '' : `Cart total: ${formatPrice(Number(originalPrice))}`;
  }
}
