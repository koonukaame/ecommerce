import { formatPrice } from './format-price';
import { CustomEventEmitter } from '../utils/event-emitter';

export const costEventEmitter = new CustomEventEmitter();

export function createTotalCostEmitter(span: HTMLSpanElement): void {
  costEventEmitter.subscribe('total-cost', (sum) => {
    span.textContent = sum === 0 ? '' : `Total to be paid: ${formatPrice(Number(sum))}`;
  });
}
