import { getAllProducts } from '../../app/api';
import { searchProducts } from '../../app/api/get-product-by-search';
import { searchEventEmitter } from '../../components/catalog/product-list';

export async function handleSearchInput(event: Event): Promise<void> {
  const target = event.target;

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  const query = target.value.trim().toLowerCase();

  if (query === '') {
    const allProducts = await getAllProducts();
    searchEventEmitter.emit('search', allProducts);
  } else {
    const searchedProducts = await searchProducts(query);
    searchEventEmitter.emit('search', searchedProducts);
  }
}
