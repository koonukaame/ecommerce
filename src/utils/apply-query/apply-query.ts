import { queryProducts } from '../../app/api';
import { queryState } from '../../app/state/query-state';
import { productsWrapperEmitter } from '../../components/catalog/products-wrapper';
import { paginationEventEmitter } from '../../components/catalog/pagination/pagination-controls';

export async function applyQuery(): Promise<void> {
  if (queryState.isApplyingQuery) {
    return;
  }

  queryState.isApplyingQuery = true;

  try {
    const result = await queryProducts(
      queryState.search,
      queryState.sort,
      queryState.filter.price,
      queryState.filter.length,
      queryState.category,
      queryState.offset,
    );

    paginationEventEmitter.emit('pagination');

    if ('results' in result) {
      productsWrapperEmitter.emit('render-products', result);
    }
  } catch {
    throw new Error('Failed to apply filters');
  } finally {
    queryState.isApplyingQuery = false;
  }
}
