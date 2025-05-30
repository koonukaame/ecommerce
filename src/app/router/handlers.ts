import type { PageType } from '../../app/types';

import { appState } from '../../app/app-state';
import { Page } from '../constants';

export const changePath = (page: PageType, slug?: string): (() => void) => {
  const callback = (): void => {
    globalThis.location.hash = slug ? `#${page}?${slug}` : `#${page}`;
  };
  return callback;
};

export function checkRenderPage(path: string): PageType {
  if (path === '') {
    return Page.main;
  }

  const page = path.includes('?') ? path.slice(0, path.indexOf('?')) : path;

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

export function getParametere(): string {
  const hash = globalThis.location.hash.slice(1).trim();
  const slug = hash.slice(hash.indexOf('?') + 1);
  return slug;
}

function isPage(value: string): value is PageType {
  return value in Page;
}
