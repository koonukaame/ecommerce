import type { Cart } from '@commercetools/platform-sdk';

export function calculateDiscountPriceForCart(cart: Cart): {
  discountedPrice: number;
  originalPrice: number;
} {
  const discountAmount = cart.discountOnTotalPrice?.discountedAmount.centAmount ?? 0;
  const discountedPrice = cart.totalPrice.centAmount;
  const originalPrice = discountedPrice + discountAmount;

  return { discountedPrice, originalPrice };
}
