import { queryState } from '../../app/state/query-state';
import { queryChangeEmitter } from '../../helpers/apply-query-emitter';

export async function handleSortSelection(event: Event): Promise<void> {
  const target = event.target;
  if (!(target instanceof HTMLSelectElement)) {
    return;
  }

  queryState.sort = target.value;

  queryChangeEmitter.emit('sort-change');
}
