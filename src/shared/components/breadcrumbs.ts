import type { BreadcrumbItem, BreadcrumbLevel } from '../../app/types';

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
      callback: () => console.log(`go to page ${page} with slug ${slug}`),
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
