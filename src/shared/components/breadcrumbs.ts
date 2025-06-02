import type { BreadcrumbItem, BreadcrumbLevel, PageType } from '../../app/types';
import type { ProductProjection, Category } from '@commercetools/platform-sdk';

import { Page } from '../../app/constants';
import { changePath } from '../../app/router/handlers';
import { createButton, createDiv, createSpan } from '../../utils/create-elements/create-tags';
import { BREADCRUMBS } from '../styles';

export function getBaseBreadcrumbs(): BreadcrumbItem[] {
  return [
    {
      label: 'Main page',
      callback: changePath(Page.main),
    },
    {
      label: 'Catalog',
      callback: changePath(Page.catalog),
    },
  ];
}

export function getBreadcrumbs(levels: BreadcrumbLevel[]): BreadcrumbItem[] {
  return [
    ...getBaseBreadcrumbs(),
    ...levels.map(({ label, page, slug }) => ({
      label: label,
      callback: changePath(page, slug),
    })),
  ];
}

export function BreadCrumbsLayout(items: BreadcrumbItem[]): HTMLElement {
  const container = createDiv({ classes: BREADCRUMBS.container });

  items.map(({ label, callback }, index) => {
    createButton({
      classes: BREADCRUMBS.link,
      text: label,
      events: { click: () => callback() },
      parent: container,
    });

    if (index < items.length - 1) {
      createSpan({
        classes: BREADCRUMBS.separator,
        parent: container,
      });
    }
  });

  return container;
}

export function getBreadcrumbsChain(
  PageCatalog: PageType,
  PageProduct: PageType,
  product?: ProductProjection,
  productName?: string,
  productSlug?: string,
  category?: Category,
  subcategory?: Category,
): BreadcrumbLevel[] {
  const chain: BreadcrumbLevel[] = [];

  const categoryObject = product?.categories[0]?.obj ?? category;
  const subcategoryObject = product?.categories[1]?.obj ?? subcategory;

  if (categoryObject) {
    chain.push({
      label: categoryObject.name.en,
      page: PageCatalog,
      slug: `category=${categoryObject.slug.en}`,
    });
  }

  if (subcategoryObject) {
    chain.push({
      label: subcategoryObject.name.en,
      page: PageCatalog,
      slug: `category=${categoryObject?.slug.en}&subcategory=${subcategoryObject.slug.en}`,
    });
  }

  if (productName && productSlug) {
    chain.push({
      label: productName,
      page: PageProduct,
      slug: productSlug,
    });
  }

  return chain;
}
