import { searchProducts } from '../../app/api/get-product-by-search';
import { searchEventEmitter } from '../../components/catalog/product-list';

export async function handleSearchInput(event: Event): Promise<void> {
  const target = event.target;

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  const query = target.value.trim().toLowerCase();

  const searchedProducts = await searchProducts(query);
  searchEventEmitter.emit('search', searchedProducts);
}
