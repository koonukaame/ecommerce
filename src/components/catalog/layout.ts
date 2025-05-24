import { createDiv } from '../../utils/create-elements/create-tags';
import { getAllProducts } from '../../app/api';
import { createProductList } from './product-list';
import { createSearchWrapper } from './search';
import { CATALOG } from '../../pages/catalog/constants';

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({ classes: CATALOG.wrapper });

  createSearchWrapper(layout);

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
