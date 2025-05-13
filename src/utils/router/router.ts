import type { PageType } from '../../app/types';

import { appState } from '../../app/app-state';
import { renderPage } from './render-page';
import { Page } from './types';

export function router(): void {
  globalThis.addEventListener('hashchange', () => {
    const hash = globalThis.location.hash.slice(Number('1')).trim();
    if (
      (hash === Page.profile && !appState.isLogined) ||
      ((hash === Page.login || hash === Page.registration) && appState.isLogined)
    ) {
      return;
    }
    appState.currentPage = isPage(hash) ? hash : Page.error;

    globalThis.location.hash = `#${hash}`;
    renderPage(appState.currentPage);
  });
}

function isPage(value: string): value is PageType {
  return value in Page;
}
