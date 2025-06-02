import './style.css';

import { createDiv } from '../../utils/create-elements/create-tags';
import { CATALOG } from '../../pages/catalog/constants';
import { createSearchSortWrapper } from './search-sort-wrapper';
import { createFilterComponent } from './filter/filter-price/filter-component';
import { applyQuery } from '../../utils/apply-query/apply-query';
import { createProductsWrapper } from './products-wrapper';
import { handleURLProductsFilter } from '../../utils/query-handlers/products-url';
import { createBreadcrumbsWrapper } from './breadcrumbs/breadcrumb-wrapper';
import { createMenuWrapper } from './menu/menu-wrapper';

export async function catalogLayout(): Promise<HTMLDivElement> {
  const layout = createDiv({ classes: CATALOG.wrapper });
  await createMenuWrapper(layout);

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
  if (globalThis.location.hash.startsWith('#catalog')) {
    await handleURLProductsFilter();
    await applyQuery();
  }
});
