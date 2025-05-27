import { createDiv } from '../../utils/create-elements/create-tags';
import { fetchProductCards } from '../../helpers/fetch-product-cards';
import { CATALOG } from '../../pages/catalog/constants';
import { createPriceFilter } from './filter-price/filter-price';
import { createSearchSortWrapper } from './search-sort-wrapper';

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({ classes: CATALOG.wrapper });

  const searchSortWrapper = createSearchSortWrapper();
  const priceFilterComponent = createPriceFilter(layout);

  createDiv({
    classes: CATALOG.queryWrapper,
    children: [searchSortWrapper, priceFilterComponent],
    parent: layout,
  });

  await fetchProductCards(layout);

  return layout;
}
