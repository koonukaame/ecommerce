import { CustomEventEmitter } from '../utils/event-emitter';
import { createPriceWithPromocode } from '../components/cart/price-with-promocode';

export const costEventEmitter = new CustomEventEmitter();

export function createTotalCostEmitter(span: HTMLSpanElement): void {
  costEventEmitter.subscribe('total-cost', (originalPrice: unknown, discountedPrice: unknown) => {
    if (typeof originalPrice === 'number' && typeof discountedPrice === 'number') {
      createPriceWithPromocode(span, originalPrice, discountedPrice);
    }
  });
}
