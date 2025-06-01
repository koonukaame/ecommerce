import { queryState } from '../../app/state/query-state';
import { queryChangeEmitter } from '../../components/catalog/layout';

export async function handleSearchInput(event: Event): Promise<void> {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  queryState.search = target.value.trim().toLowerCase();

  queryChangeEmitter.emit('search-change');
}
