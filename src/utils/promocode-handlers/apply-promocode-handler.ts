import { createPopupMessage } from '../../shared/components/popup';
import { applyPromocode } from '../../app/api';
import { isFetchError } from '../type-guards/is-fetch-error';

export async function applyPromocodeHandler(promocodeInput: HTMLInputElement): Promise<void> {
  const code = promocodeInput.value.trim();
  if (!code) {
    createPopupMessage('Please enter a promocode', false);
    return;
  }
  const result = await applyPromocode(code);
  if (isFetchError(result)) {
    createPopupMessage(result.message || 'Failed to apply promocode', false);
    return;
  }

  createPopupMessage(`Promocode "${code}" successfully applied!`, true);

  promocodeInput.disabled = true;
}
