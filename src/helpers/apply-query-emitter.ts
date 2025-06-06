import { applyQuery } from '../utils/apply-query/apply-query';
import { CustomEventEmitter } from '../utils/event-emitter';
import { queryState } from '../app/state/query-state';

export const queryChangeEmitter = new CustomEventEmitter();

function onQueryChange(): void {
  queryState.offset = 0;
  applyQuery();
}

queryChangeEmitter.subscribe('length-change', onQueryChange);
queryChangeEmitter.subscribe('price-change', onQueryChange);
queryChangeEmitter.subscribe('search-change', onQueryChange);
queryChangeEmitter.subscribe('sort-change', onQueryChange);
queryChangeEmitter.subscribe('category-change', onQueryChange);
queryChangeEmitter.subscribe('query-change', onQueryChange);
