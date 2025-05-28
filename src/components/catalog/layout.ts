import { createDiv } from '../../utils/create-elements/create-tags';
import { fetchProductCards } from '../../helpers/fetch-product-cards';
import { CATALOG } from '../../pages/catalog/constants';
import { createSearchSortWrapper } from './search-sort-wrapper';
import { createFilterComponent } from './filter/filter-price/filter-component';
import './style.css';

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({ classes: CATALOG.wrapper });

  const searchSortWrapper = createSearchSortWrapper();
  const filterComponent = createFilterComponent();

  createDiv({
    classes: CATALOG.queryWrapper,
    children: [filterComponent, searchSortWrapper],
    parent: layout,
  });

  await fetchProductCards(layout);

  return layout;
}
