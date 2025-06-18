import { updateQuantity } from '../update-quantity/update-quantity';

export function increaseQuantityHandler(quantityText: HTMLSpanElement, lineItemId: string): void {
  const current = Number(quantityText.textContent);
  updateQuantity(lineItemId, current + 1);
}
