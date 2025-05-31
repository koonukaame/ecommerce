import { createDiv } from '../../utils/create-elements/create-tags';
import { createSearchWrapper } from './search/search';
import { fetchProductCards } from '../../helpers/fetch-product-cards';
import { CATALOG } from '../../pages/catalog/constants';
import { createSortComponent } from './sort';
import { fetchCategories } from '../../utils/fetch/fetch-categories';

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({ classes: CATALOG.wrapper });

  const searchWrapper = createSearchWrapper(layout);
  const sortComponent = createSortComponent(layout);

  createDiv({ classes: CATALOG.queryWrapper, children: [searchWrapper, sortComponent], parent: layout });

  await fetchCategories(layout);
  await fetchProductCards(layout);

  return layout;
}
