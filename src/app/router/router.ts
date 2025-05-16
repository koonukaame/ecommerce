import { appState } from '../app-state';
import { Page } from '../constants';
import { checkRenderPage } from './handlers';
import { renderPage } from './render-page';

export function router(): void {
  globalThis.addEventListener('hashchange', () => {
    const hash = globalThis.location.hash.slice(1).trim();
    const currentPage = checkRenderPage(hash);

    if (appState.currentPage !== currentPage) {
      appState.currentPage = currentPage;
      renderPage(currentPage);
    }

    globalThis.location.hash = appState.currentPage === Page.error ? `#${hash}` : `#${appState.currentPage}`;
  });
}
