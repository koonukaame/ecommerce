import type { LocalizedString } from '@commercetools/platform-sdk';
import { Page } from '../../app/constants';
import { changePath } from '../../app/router/handlers';
import { createButton, createDiv, createSpan } from '../../utils/create-elements/create-tags';

type CrumbEntry = [text: string | LocalizedString, callback: () => void];

const BREADCRUMBS_PARTS: CrumbEntry[] = [
  ['Main page', () => changePath(Page.main)()],
  ['Catalog', () => changePath(Page.catalog)()],
];

export function BreadCrumbs(entries: CrumbEntry[]): HTMLElement {
  const container = createDiv({ classes: ['w-full', 'md:px-5'] });
  [...BREADCRUMBS_PARTS, ...entries].map(([linkName, callback], index, array) => {
    createButton({
      classes: [
        'p-1.5',
        'md:p-3',
        'cursor-pointer',
        'md:text-xl',
        'hover:text-(--hover-link-header)',
        'transition-[color]',
      ],
      text: typeof linkName === 'string' ? linkName : linkName['en'],
      events: { click: callback },
      parent: container,
    });

    if (index < array.length - 1) {
      createSpan({
        classes: [
          'bg-no-repeat',
          'bg-contain',
          'h-3',
          'md:h-5',
          'md:mx-6',
          'w-2',
          'md:w-5',
          'inline-block',
          'bg-[url("./svg/greater.svg")]',
        ],
        parent: container,
      });
    }
  });
  return container;
}
