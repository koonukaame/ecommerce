import { createProductCard } from './card';
import { createDiv } from '../../utils/create-elements/create-tags';
import { getAllProducts } from '../../app/api';

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({});
  const data = await getAllProducts();

  if ('results' in data) {
    const card = createProductCard(data);
    layout.append(card);
  } else {
    layout.textContent = `Error: ${data.message}`;
  }

  return layout;
}
