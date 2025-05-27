import { searchEventEmitter, sortEventEmitter, filterEventEmitter } from '../../components/catalog/product-list';
import { queryProducts } from '../../app/api';
import { queryState } from '../../app/state/query-state';

export async function applyQuery(): Promise<void> {
  try {
    const result = await queryProducts(queryState.search, queryState.sort, queryState.filter.price);

    if ('results' in result) {
      switch (queryState.lastQueryType) {
        case 'search': {
          searchEventEmitter.emit('search', result);

          break;
        }
        case 'sort': {
          sortEventEmitter.emit('sort', result);

          break;
        }
        case 'filter-price': {
          filterEventEmitter.emit('filter', result);

          break;
        }
        default: {
          break;
        }
      }
    }
  } catch {
    throw new Error('Failed to apply filters');
  }
}
