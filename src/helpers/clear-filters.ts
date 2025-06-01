import { queryState } from '../app/state/query-state';
import { clearLengthEmitter } from '../components/catalog/filter/filter-price/filter-length';
import { clearPriceEmitter } from '../components/catalog/filter/filter-price/price-range';
import { queryChangeEmitter } from '../components/catalog/layout';

export async function clearAllFilters(): Promise<void> {
  queryState.filter.length = [];
  clearLengthEmitter.emit('clear-length-filters');

  const startMin = queryState.filter.price.startMin;
  const startMax = queryState.filter.price.startMax;

  if (startMin && startMax) {
    queryState.filter.price.min = startMin;
    queryState.filter.price.max = startMax;

    clearPriceEmitter.emit('clear-price-filter', {
      min: Number(startMin),
      max: Number(startMax),
    });
  }

  queryChangeEmitter.emit('query-change');
}
