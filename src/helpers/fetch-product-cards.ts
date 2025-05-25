import { getAllProducts } from '../app/api';
import { createProductList } from '../components/catalog/product-list';

export async function fetchProductCards(layout: HTMLDivElement): Promise<void> {
  const data = await getAllProducts();

  try {
    if ('results' in data) {
      const cards = createProductList(data);
      layout.append(cards);
    }
  } catch {
    throw new Error('Failed to fetch products');
  }
}
