import type { PageType } from '../../app/types';

import { appState } from '../../app/app-state';
import { Page } from '../constants';

export const changePath = (page: PageType): (() => void) => {
  const callback = (): void => {
    if (page === appState.currentPage) {
      globalThis.location.hash = `#${appState.currentPage}`;
    } else {
      if ((page === Page.login || page === Page.registration) && appState.isLogined) {
        return;
      }

      if (page === Page.profile && !appState.isLogined) {
        return;
      }

      globalThis.location.hash = `#${page}`;
    }
  };
  return callback;
};
