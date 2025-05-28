import type { PageType } from '../../app/types';

import { appState } from '../../app/app-state';
import { Page } from '../constants';

export const changePath = (page: PageType): (() => void) => {
  const callback = (): void => {
    globalThis.location.hash = `#${page}`;
  };
  return callback;
};

export function checkRenderPage(page: string): PageType {
  if (page === '') {
    return Page.main;
  }

  if (!isPage(page)) {
    return Page.error;
  }

  if (
    ((page === Page.login || page === Page.registration) && appState.isLogined) ||
    (page === Page.profile && !appState.isLogined)
  ) {
    return Page.main;
  }

  return page;
}

function isPage(value: string): value is PageType {
  return value in Page;
}
