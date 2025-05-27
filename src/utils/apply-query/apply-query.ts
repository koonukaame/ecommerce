import { searchEventEmitter, sortEventEmitter, filterEventEmitter } from '../../components/catalog/product-list';
import { queryProducts } from '../../app/api';
import { queryState } from '../../app/state/query-state';

export async function applyQuery(): Promise<void> {
  try {
    const result = await queryProducts(queryState.search, queryState.sort, queryState.filter.price);

    if ('results' in result) {
      searchEventEmitter.emit('search', result);
      sortEventEmitter.emit('sort', result);
      filterEventEmitter.emit('filter', result);
    }
  } catch {
    throw new Error('Failed to apply filters');
  }
}
