import { createDiv } from '../../utils/create-elements/create-tags';
import { fetchProductCards } from '../../helpers/fetch-product-cards';
import { CATALOG } from '../../pages/catalog/constants';
import { createSearchSortWrapper } from './search-sort-wrapper';
import { createFilterWrapper } from './filter-wrapper';

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({ classes: CATALOG.wrapper });

  const searchSortWrapper = createSearchSortWrapper();
  const filterWrapper = createFilterWrapper();

  createDiv({
    classes: CATALOG.queryWrapper,
    children: [filterWrapper, searchSortWrapper],
    parent: layout,
  });

  await fetchProductCards(layout);

  return layout;
}
