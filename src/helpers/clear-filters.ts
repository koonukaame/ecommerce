import { queryState } from '../app/state/query-state';
import { getRangePrices } from '../utils/fetch/fetch-prices';
import { applyQuery } from '../utils/apply-query/apply-query';
import { clearLengthEmitter } from '../components/catalog/filter/filter-price/filter-length';
import { clearPriceEmitter } from '../components/catalog/filter/filter-price/price-range';

export async function clearAllFilters(): Promise<void> {
  queryState.filter.length = [];
  clearLengthEmitter.emit('clear-length-filters');

  const { min, max } = await getRangePrices();

  queryState.filter.price.min = String(min);
  queryState.filter.price.max = String(max);

  clearPriceEmitter.emit('clear-price-filter', { min, max });

  await applyQuery();
}
