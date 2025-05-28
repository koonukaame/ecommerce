import { FULL_PERCENT } from '../shared/constants';

export function calculateDiscount(originalPrice: number, discountedPrice?: number): number | undefined {
  if (!discountedPrice) {
    return undefined;
  }

  return Math.round(FULL_PERCENT - (discountedPrice / originalPrice) * FULL_PERCENT);
}
