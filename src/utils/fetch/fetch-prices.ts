import { CENTS_IN_DOLLAR } from '../../shared/constants';
import { getAllProducts } from '../../app/api';
import { queryState } from '../../app/state/query-state';

export async function getRangePrices(): Promise<void> {
  if (queryState.filter.price.startMin !== undefined && queryState.filter.price.startMax !== undefined) {
    return;
  }

  const response = await getAllProducts();

  if (!('results' in response)) {
    return;
  }

  const allPrices: number[] = [];

  for (const product of response.results) {
    const prices = product.masterVariant.prices || [];

    for (const price of prices) {
      const centAmount = price.discounted ? price.discounted.value.centAmount : price.value.centAmount;
      allPrices.push(centAmount);
    }
  }

  if (allPrices.length === 0) {
    return;
  }

  const min = Math.min(...allPrices) / CENTS_IN_DOLLAR;
  const max = Math.max(...allPrices) / CENTS_IN_DOLLAR;

  queryState.filter.price.startMin = String(min);
  queryState.filter.price.startMax = String(max);
}
