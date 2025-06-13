import { updateQuantity } from '../update-quantity/update-quantity';

export function decreaseQuantityHandler(quantityText: HTMLSpanElement, lineItemId: string): void {
  const current = Number(quantityText.textContent);
  const updated = current - 1;
  if (updated > 0) {
    updateQuantity(lineItemId, updated);
  }
}
