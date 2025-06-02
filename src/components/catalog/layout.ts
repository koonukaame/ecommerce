import './style.css';

import { createDiv } from '../../utils/create-elements/create-tags';
import { CATALOG } from '../../pages/catalog/constants';
import { createSearchSortWrapper } from './search-sort-wrapper';
import { createFilterComponent } from './filter/filter-price/filter-component';
import { createCategoryMenu } from './menu';
import { CustomEventEmitter } from '../../utils/event-emitter';
import { applyQuery } from '../../utils/apply-query/apply-query';
import { createProductsWrapper } from './products-wrapper';
import { handleURLProductsFilter } from '../../utils/query-handlers/products-url';
import { createBreadcrumbsWrapper } from './breadcrumbs/breadcrumb-wrapper';

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

  createBreadcrumbsWrapper(products);

  createProductsWrapper(products);

  await handleURLProductsFilter();
  await applyQuery();

  return layout;
}

globalThis.addEventListener('hashchange', async () => {
  await handleURLProductsFilter();

  await applyQuery();
});

function onQueryChange(): void {
  applyQuery();
}

queryChangeEmitter.subscribe('length-change', onQueryChange);
queryChangeEmitter.subscribe('price-change', onQueryChange);
queryChangeEmitter.subscribe('search-change', onQueryChange);
queryChangeEmitter.subscribe('sort-change', onQueryChange);
queryChangeEmitter.subscribe('category-change', onQueryChange);
queryChangeEmitter.subscribe('query-change', onQueryChange);
