import type { Options } from '../../utils/create-elements/types';

import { Page } from '../../app/constants';

export const MAIN_CLASSES: Record<string, string[]> = {
  line: ['m-[10px]', 'w-[90%]'],
  link: [
    'sm:text-4xl',
    'text-xl',
    'cursor-pointer',
    'hover:',
    'hover:text-(--hover-link-header)',
    'transition-[color]',
  ],
  linkContainer: ['mt-auto', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-white', 'text-3xl', 'mb-auto'],
  wrapper: ['h-screen', 'flex', 'flex-col', 'items-center', 'justify-center'],
};

type MainKey = Record<'line' | 'link' | 'text', MainProperties>;
type MainProperties = Pick<Options<keyof HTMLElementTagNameMap>, 'classes' | 'events' | 'text'>;

export const MAIN_CONFIG: MainKey = {
  line: {
    classes: MAIN_CLASSES.line,
  },
  link: {
    classes: MAIN_CLASSES.link,
    events: {
      click: () => (globalThis.location.hash = `#${Page.catalog}`),
    },
    text: 'Catalog >>',
  },
  text: {
    classes: ['sm:text-6xl', 'text-2xl'],
    text: 'New collection',
  },
};
