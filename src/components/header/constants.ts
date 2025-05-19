import type { Options } from '../../utils/create-elements/types';

import { appState } from '../../app/app-state';
import { Page } from '../../app/constants';
import { changePath } from '../../app/router/handlers';
import { toggleClassesOnRedirect } from '../../helpers/toggle-classes-on-redirect';

export const HEADER_CLASSES: Record<string, string[]> = {
  header: [
    'fixed',
    'h-16',
    'grid',
    'gap-0',
    'px-2',
    'md:px-8',
    'grid-cols-3',
    'grid-flow-col',
    'md:grid-cols-[max-content_1fr_2fr_max-content_0.5fr]',
    'text-xl',
    'md:text-2xl',
    'w-full',
    'bg-stone-50',
    'header',
  ],
  leftMenu: ['text-left', 'gap-7', 'items-center', 'hidden', 'md:flex'],
  menuItem: ['cursor-pointer', 'text-stone-700', 'transition-[color]', 'header-hovered', 'uppercase'],
  rightMenu: [
    'flex',
    'items-center',
    'justify-start',
    'md:justify-center',
    'gap-2',
    'order-first',
    'md:order-none',
    'md:gap-4',
    'md:items-left',
    'whitespace-nowrap',
  ],
  svgButtonBasket: ['cursor-pointer'],
  svgButtonPerson: ['cursor-pointer', 'logined'],
  svgDiv: ['flex', 'items-center', 'justify-center', 'gap-2', 'md:gap-4'],
  svgPicture: ['w-12', 'h-8', 'bg-no-repeat', 'bg-center', 'transition-[fill]', 'header-hovered', 'md:h-9'],
};

type HeaderButton = Record<'about' | 'catalog' | 'login' | 'logout' | 'registration', HederButtonProperties>;
type HederButtonProperties = Pick<Options<keyof HTMLElementTagNameMap>, 'classes' | 'events' | 'text'>;

export const BUTTONS_CONFIG: HeaderButton = {
  about: {
    classes: HEADER_CLASSES.menuItem,
    events: {
      click: changePath(Page.about),
    },
    text: 'About Us',
  },
  catalog: {
    classes: HEADER_CLASSES.menuItem,
    events: {
      click: changePath(Page.catalog),
    },
    text: 'Catalog',
  },
  login: {
    classes: [...HEADER_CLASSES.menuItem, 'not-logined'],
    events: {
      click: changePath(Page.login),
    },
    text: 'log in',
  },
  logout: {
    classes: [...HEADER_CLASSES.menuItem, 'logined'],
    events: {
      click: () => {
        appState.isLogined = false;
        toggleClassesOnRedirect(appState.isLogined, Page.main);
        console.info('User logged out');
        changePath(Page.main)();
      },
    },
    text: 'log out',
  },
  registration: {
    classes: [...HEADER_CLASSES.menuItem, 'not-logined'],
    events: {
      click: changePath(Page.registration),
    },
    text: 'Sign up',
  },
};
