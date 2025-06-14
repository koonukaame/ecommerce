import { formatPrice } from '../../../helpers/format-price';
import { CustomEventEmitter } from '../../../utils/event-emitter';

export const costEventEmitter = new CustomEventEmitter();

export function createTotalCostEmitter(span: HTMLSpanElement): void {
  costEventEmitter.subscribe('total-cost', (...arguments_): void => {
    span.textContent = arguments_[0] === 0 ? '' : `Total to be paid: ${formatPrice(Number(arguments_[0]))}`;
  });
}
