import { createProductCard } from './card';
import { createDiv } from '../../utils/create-elements/create-tags';
import { getAllProducts } from '../../app/api';

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({});
  const data = await getAllProducts();

  try {
    if ('results' in data) {
      const cards = createProductCard(data);
      layout.append(cards);
    }
  } catch {
    throw new Error('Failed to fetch products');
  }
  return layout;
}
