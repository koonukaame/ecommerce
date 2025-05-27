import { queryState } from '../../app/state/query-state';
import { applyQuery } from '../apply-query/apply-query';

export async function handlePriceFilterChange(values: (string | number)[]): Promise<void> {
  const [newMin, newMax] = values.map(Number);

  queryState.filter.price.min = String(newMin);
  queryState.filter.price.max = String(newMax);
  queryState.lastQueryType = 'filter-price';

  await applyQuery();
}
