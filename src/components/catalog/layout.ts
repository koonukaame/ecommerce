import { createDiv } from '../../utils/create-elements/create-tags';
import { fetchProductCards } from '../../helpers/fetch-product-cards';

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({});

  await fetchProductCards(layout);

  return layout;
}
