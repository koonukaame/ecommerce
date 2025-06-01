import { queryEventEmitter } from '../../components/catalog/product-list';
import { queryProducts } from '../../app/api';
import { queryState } from '../../app/state/query-state';

export async function applyQuery(): Promise<void> {
  try {
    const result = await queryProducts(
      queryState.search,
      queryState.sort,
      queryState.filter.price,
      queryState.filter.length,
      queryState.category,
    );

    if ('results' in result) {
      queryEventEmitter.emit('query', result);
    }

    console.log(
      queryState.search,
      queryState.sort,
      queryState.filter.price,
      queryState.filter.length,
      queryState.category,
    );
  } catch {
    throw new Error('Failed to apply filters');
  }
}
