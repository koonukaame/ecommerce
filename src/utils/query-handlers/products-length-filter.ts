import { queryState } from '../../app/state/query-state';
import { NOT_FOUND_INDEX } from '../../shared/constants';
import { queryChangeEmitter } from '../../components/catalog/layout';

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

  queryChangeEmitter.emit('length-change');
}
