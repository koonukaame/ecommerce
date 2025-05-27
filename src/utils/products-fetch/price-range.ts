import { queryState } from '../../app/state/query-state';
import { queryProducts } from '../../app/api';
import { CENTS_IN_DOLLAR } from '../../shared/constants';

async function fetchSortedPrices(sort: string): Promise<number | undefined> {
  const data = await queryProducts(undefined, sort);

  if ('results' in data) {
    const prices = data.results[0].masterVariant.prices || [];
    const price = prices[0].value.centAmount;
    return price / CENTS_IN_DOLLAR;
  }

  return undefined;
}

export async function getRangePrices(): Promise<void> {
  const min = await fetchSortedPrices('price asc');
  const max = await fetchSortedPrices('price desc');

  queryState.filter.price.min = String(min);
  queryState.filter.price.max = String(max);
}
