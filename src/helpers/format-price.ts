import { CENTS_IN_DOLLAR, DECIMAL_PLACES } from '../shared/constants';

export function formatPrice(price: number): string {
  const priceInDollars = price / CENTS_IN_DOLLAR;

  return Number.isInteger(priceInDollars) ? `${priceInDollars} $` : `${priceInDollars.toFixed(DECIMAL_PLACES)} $`;
}
