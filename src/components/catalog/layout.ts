import { createDiv } from '../../utils/create-elements/create-tags';
import { createSearchWrapper } from './search';
import { fetchProductCards } from '../../helpers/fetch-product-cards';
import { CATALOG } from '../../pages/catalog/constants';
import { createSortComponent } from './sort';
import { createPriceFilter } from './filter-price';

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({ classes: CATALOG.wrapper });

  const searchWrapper = createSearchWrapper(layout);
  const sortComponent = createSortComponent(layout);
  const priceFilterComponent = createPriceFilter(layout);

  createDiv({
    classes: CATALOG.queryWrapper,
    children: [searchWrapper, sortComponent, priceFilterComponent],
    parent: layout,
  });

  await fetchProductCards(layout);

  return layout;
}
