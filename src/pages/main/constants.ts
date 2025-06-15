import type { Options } from '../../utils/create-elements/types';

import { Page } from '../../app/constants';
import { changePath } from '../../app/router/handlers';

export const MAIN_CLASSES: Record<string, string[]> = {
  line: ['m-[10px]', 'w-[90%]'],
  link: [
    'sm:text-4xl',
    'text-xl',
    'cursor-pointer',
    'hover:',
    'hover:text-(--hover-link-header)',
    'transition-[color]',
    'select-none',
  ],
  linkContainer: [
    'h-screen',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'text-white',
    'text-3xl',
    'pb-[40px]',
  ],
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
      click: changePath(Page.catalog),
    },
    text: 'Catalog >>',
  },
  text: {
    classes: ['sm:text-6xl', 'text-2xl'],
    text: 'New collection',
  },
};

export const PROMOCODES = {
  welcome: 'Welcome! Get 15% off your first order',
  winter: 'Spend over 1500 USD and get 30% off with a "WINTER30" promocode.',
};
