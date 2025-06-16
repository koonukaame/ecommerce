import { createPopupMessage } from '../../shared/components/popup';
import { applyPromocode } from '../../app/api';
import { isFetchError } from '../type-guards/is-fetch-error';
import { costEventEmitter } from '../../helpers/total-cost-emitter';
import { calculateDiscountPriceForCart } from '../../helpers/calculate-discount-price';

export async function applyPromocodeHandler(promocodeInput: HTMLInputElement): Promise<void> {
  const code = promocodeInput.value.trim();
  if (!code) {
    createPopupMessage('Please enter promocode', false);
    return;
  }

  const result = await applyPromocode(code);
  if (isFetchError(result)) {
    createPopupMessage(result.message || 'Failed to apply promocode', false);
    return;
  }

  const { originalPrice, discountedPrice } = calculateDiscountPriceForCart(result);
  costEventEmitter.emit('total-cost', originalPrice, discountedPrice);

  if (result.discountCodes[0].state === 'DoesNotMatchCart') {
    createPopupMessage(`Promocode "${code}" does not match cart`, false);
    return;
  }

  createPopupMessage(`Promocode "${code}" successfully applied!`, true);
}
