import { applyQuery } from '../apply-query/apply-query';
import { queryState } from '../../app/state/query-state';

export async function handleSortSelection(event: Event): Promise<void> {
  const target = event.target;
  if (!(target instanceof HTMLSelectElement)) {
    return;
  }

  queryState.sort = target.value;
  queryState.lastQueryType = 'sort';
  await applyQuery();
}
