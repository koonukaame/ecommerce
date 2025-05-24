import { createDiv } from '../../utils/create-elements/create-tags';
import { getAllProducts } from '../../app/api';
import { createProductList } from './product-list';

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({});
  const data = await getAllProducts();

  try {
    if ('results' in data) {
      const cards = createProductList(data);
      layout.append(cards);
    }
  } catch {
    throw new Error('Failed to fetch products');
  }
  return layout;
}
