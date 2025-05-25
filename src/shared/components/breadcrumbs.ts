import type { LocalizedString } from '@commercetools/platform-sdk';
import { Page } from '../../app/constants';
import { changePath } from '../../app/router/handlers';
import { createButton, createDiv, createSpan } from '../../utils/create-elements/create-tags';
import { BREADCRUMBS } from '../styles';

export type CrumbEntry = [text: string | LocalizedString, callback: () => void];

const BREADCRUMBS_PARTS: CrumbEntry[] = [
  ['Main page', () => changePath(Page.main)()],
  ['Catalog', () => changePath(Page.catalog)()],
];

export function BreadCrumbs(entries: CrumbEntry[]): HTMLElement {
  const container = createDiv({ classes: BREADCRUMBS.container });

  [...BREADCRUMBS_PARTS, ...entries].map(([linkName, callback], index, array) => {
    createButton({
      classes: BREADCRUMBS.link,
      text: typeof linkName === 'string' ? linkName : linkName['en'],
      events: { click: callback },
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
