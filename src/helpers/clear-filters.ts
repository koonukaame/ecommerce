import { queryState } from '../app/state/query-state';
import { getRangePrices } from '../utils/fetch/price-range';
import { applyQuery } from '../utils/apply-query/apply-query';
import { clearLengthEmitter } from '../components/catalog/filter/filter-price/filter-length';
import { clearPriceEmitter } from '../components/catalog/filter/filter-price/price-range';

export async function clearAllFilters(): Promise<void> {
  queryState.filter.length = [];
  clearLengthEmitter.emit('clear-length-filters');

  getRangePrices().then(({ min, max }) => {
    queryState.filter.price.min = String(min);
    queryState.filter.price.max = String(max);
  });

  clearPriceEmitter.emit('clear-price-filter');

  await applyQuery();
}
