import type { AppState } from './types';

import { Page } from '../utils/router/types';

export const appState: AppState = {
  currentPage: Page.main,
  isLogined: false,
};
