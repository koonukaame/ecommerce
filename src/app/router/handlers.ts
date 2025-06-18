import type { PageType } from '../../app/types';

import { appState } from '../../app/app-state';
import { Page } from '../constants';

export const changePath = (page: PageType, slug?: string): (() => void) => {
  const callback = (): void => {
    globalThis.location.hash = slug ? `#${page}?${slug}` : `#${page}`;
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

  if ((page === Page.login || page === Page.registration) && appState.isLogined) {
    return Page.main;
  }

  if (page === Page.profile && !appState.isLogined) {
    return Page.login;
  }

  return page;
}

export function getParameter(): string {
  const hash = globalThis.location.hash.slice(1).trim();
  const parameter = hash.slice(hash.indexOf('?') + 1);
  return parameter;
}

function isPage(value: string): value is PageType {
  return value in Page;
}
