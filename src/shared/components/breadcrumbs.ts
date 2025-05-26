import type { LocalizedString } from '@commercetools/platform-sdk';
import { Page } from '../../app/constants';
import { changePath } from '../../app/router/handlers';
import { createButton, createDiv, createSpan } from '../../utils/create-elements/create-tags';
import { BREADCRUMBS } from '../styles';

export type BreadcrumbItem = {
  label: string | LocalizedString;
  callback: () => void;
};

const BREADCRUMBS_GENERAL: BreadcrumbItem[] = [
  {
    label: 'Main page',
    callback: changePath(Page.main),
  },
  {
    label: 'Catalog',
    callback: changePath(Page.catalog),
  },
];

export function BreadCrumbs(breadcrumbsAdditional: BreadcrumbItem[]): HTMLElement {
  const container = createDiv({ classes: BREADCRUMBS.container });
  [...BREADCRUMBS_GENERAL, ...breadcrumbsAdditional].map(({ label, callback }, index, array) => {
    createButton({
      classes: BREADCRUMBS.link,
      text: typeof label === 'string' ? label : label['en'],
      events: { click: () => callback() },
      parent: container,
    });

    if (index < array.length - 1) {
      createSpan({
        classes: BREADCRUMBS.separator,
        parent: container,
      });
    }
  });

  return container;
}
