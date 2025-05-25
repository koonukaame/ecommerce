import { createDiv } from '../../utils/create-elements/create-tags';
import { createSearchWrapper } from './search';
import { fetchProductCards } from '../../helpers/fetch-product-cards';

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({});

  createSearchWrapper(layout);

  await fetchProductCards(layout);

  return layout;
}
