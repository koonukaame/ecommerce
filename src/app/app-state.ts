import type { AppState } from './types';

import { Page } from './constants';

export const appState: AppState = {
  currentPage: Page.main,
  isLogined: true,
};
