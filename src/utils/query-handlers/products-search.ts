import { applyQuery } from '../apply-query/apply-query';
import { queryState } from '../../app/state/query-state';

export async function handleSearchInput(event: Event): Promise<void> {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  queryState.search = target.value.trim().toLowerCase();
  queryState.lastQueryType = 'search';
  await applyQuery();
}
