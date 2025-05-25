import { sortProducts } from '../../app/api/sort-products';
import { sortEventEmitter } from '../../components/catalog/product-list';

export async function handleSort(event: Event): Promise<void> {
  const target = event.target;

  if (!(target instanceof HTMLSelectElement)) {
    return;
  }

  const sortedProducts = await sortProducts(target.value);
  sortEventEmitter.emit('sort', sortedProducts);
}
