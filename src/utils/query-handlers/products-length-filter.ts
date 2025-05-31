import { applyQuery } from '../apply-query/apply-query';
import { queryState } from '../../app/state/query-state';
import { NOT_FOUND_INDEX } from '../../shared/constants';

export async function handleLengthFilterChange(event: Event): Promise<void> {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  const value = target.value;

  const index = queryState.filter.length.indexOf(value);

  if (index === NOT_FOUND_INDEX) {
    queryState.filter.length.push(value);
  } else {
    queryState.filter.length.splice(index, 1);
  }

  queryState.lastQueryType = 'filter-length';

  await applyQuery();
}
