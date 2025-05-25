import { createDiv } from '../../utils/create-elements/create-tags';
import { createSearchWrapper } from './search';
import { fetchProductCards } from '../../helpers/fetch-product-cards';
import { CATALOG } from '../../pages/catalog/constants';

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({ classes: CATALOG.wrapper });

  createSearchWrapper(layout);

  await fetchProductCards(layout);

  return layout;
}
