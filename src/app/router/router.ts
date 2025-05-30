import { appState } from '../app-state';
import { Page } from '../constants';
import { changePath, checkRenderPage } from './handlers';
import { renderPage } from './render-page';

export function router(): void {
  globalThis.addEventListener('hashchange', () => {
    const hash = globalThis.location.hash.slice(1).trim();
    const currentPage = checkRenderPage(hash);

    if (appState.currentPage === currentPage) {
      if (currentPage === Page.catalog || currentPage === Page.product) {
        renderPage(currentPage);
      }
    } else {
      appState.currentPage = currentPage;

      if (currentPage === Page.error) {
        changePath(Page.error)();
      }
      renderPage(currentPage);
    }
  });
}
