import { appState } from '../app-state';
import { Page } from '../constants';
import { changePath, checkRenderPage } from './handlers';
import { renderPage } from './render-page';

export function router(): void {
  globalThis.addEventListener('hashchange', () => {
    const hash = globalThis.location.hash.slice(1).trim();
    const page = hash.includes('?') ? hash.slice(0, hash.indexOf('?')) : hash;
    const parameter = hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '';

    const currentPage = checkRenderPage(page);

    if (appState.currentPage === currentPage) {
      if (currentPage === Page.catalog || currentPage === Page.product) {
        renderPage(currentPage);
      }
    } else {
      if (page === currentPage) {
        appState.currentPage = currentPage;
        renderPage(currentPage);
      } else {
        if (currentPage === Page.catalog || currentPage === Page.product) {
          changePath(currentPage, parameter)();
        } else {
          changePath(currentPage)();
        }
      }
    }
  });
}
