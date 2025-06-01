import './style.css';

import { createDiv } from '../../utils/create-elements/create-tags';
import { fetchProductCards } from '../../helpers/fetch-product-cards';
import { CATALOG } from '../../pages/catalog/constants';
import { fetchCategories } from '../../utils/fetch/fetch-categories';
import { handleURLProductsFilter } from '../../utils/query-handlers/products-url';
import { createSearchSortWrapper } from './search-sort-wrapper';
import { createFilterComponent } from './filter/filter-price/filter-component';
import { createBreadcrumbs } from './breadcrumbs';
import { clearAllFilters } from '../../helpers/clear-filters';
import { queryState } from '../../app/state/query-state';

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({ classes: CATALOG.wrapper });

  const searchSortWrapper = createSearchSortWrapper();
  const filterComponent = createFilterComponent();

  createDiv({
    classes: CATALOG.queryWrapper,
    children: [filterComponent, searchSortWrapper],
    parent: layout,
  });

  await fetchCategories(layout);
  await createBreadcrumbs(layout);

  await fetchProductCards(layout);

  await handleURLProductsFilter();

  globalThis.addEventListener('hashchange', () => {
    clearAllFilters();
    queryState.search = '';
    queryState.sort = '';
    queryState.category = '';
  });

  return layout;
}
