import './style.css';

import { createDiv } from '../../utils/create-elements/create-tags';
import { CATALOG } from '../../pages/catalog/constants';
import { createSearchSortWrapper } from './search-sort-wrapper';
import { createFilterComponent } from './filter/filter-price/filter-component';
import { createBreadcrumbs } from './breadcrumbs';
import { clearAllFilters } from '../../helpers/clear-filters';
import { queryState } from '../../app/state/query-state';
import { createCategoryMenu } from './menu';
import { CustomEventEmitter } from '../../utils/event-emitter';
import { applyQuery } from '../../utils/apply-query/apply-query';
import { createProductsWrapper } from './products-wrapper';
import { handleURLProductsFilter } from '../../utils/query-handlers/products-url';

export const queryChangeEmitter = new CustomEventEmitter();

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({ classes: CATALOG.wrapper });
  await createCategoryMenu(layout);

  const products = createDiv({ classes: CATALOG.productsWrapper, parent: layout });
  const searchSortWrapper = createSearchSortWrapper();
  const filterComponent = createFilterComponent();

  createDiv({
    classes: CATALOG.queryWrapper,
    children: [filterComponent, searchSortWrapper],
    parent: products,
  });
  await createBreadcrumbs(products);

  createProductsWrapper(products);

  await handleURLProductsFilter();

  applyQuery();

  return layout;
}

globalThis.addEventListener('hashchange', () => {
  clearAllFilters();
  queryState.search = '';
  queryState.sort = '';
  queryState.category = '';
});

queryChangeEmitter.subscribe('length-change', () => {
  applyQuery();
});

queryChangeEmitter.subscribe('price-change', () => {
  applyQuery();
});

queryChangeEmitter.subscribe('search-change', () => {
  applyQuery();
});

queryChangeEmitter.subscribe('sort-change', () => {
  applyQuery();
});

queryChangeEmitter.subscribe('category-change', () => {
  applyQuery();
});
