import { searchEventEmitter } from '../../components/catalog/product-list';
import { queryProducts } from '../../app/api/filter-products';
import { queryState } from '../../app/state/query-state';

export async function applyQuery(): Promise<void> {
  try {
    const result = await queryProducts(queryState.search, queryState.sort);

    if ('results' in result) {
      searchEventEmitter.emit('search', result);
    }
  } catch {
    throw new Error('Failed to apply filters');
  }
}
