import { queryState } from '../../app/state/query-state';
import { queryChangeEmitter } from '../../helpers/apply-query-emitter';

export async function handlePriceFilterChange(values: (string | number)[]): Promise<void> {
  const [newMin, newMax] = values.map(Number);

  if (queryState.filter.price.min === String(newMin) && queryState.filter.price.max === String(newMax)) {
    return;
  }

  queryState.filter.price.min = String(newMin);
  queryState.filter.price.max = String(newMax);

  queryChangeEmitter.emit('price-change');
}
