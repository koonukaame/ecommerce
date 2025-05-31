import './style.css';
import { appState } from './app/app-state';
import { renderPage } from './app/router/render-page';
import { router } from './app/router/router';
import { changePath, checkRenderPage } from './app/router/handlers';
import { Page } from './app/constants';

(function (): void {
  router();
  const hash = globalThis.location.hash.slice(1).trim();
  const page = hash.includes('?') ? hash.slice(0, hash.indexOf('?')) : hash;
  appState.currentPage = checkRenderPage(page);
  const slug =
    hash.includes('?') && (appState.currentPage === Page.catalog || appState.currentPage === Page.product)
      ? hash.slice(hash.indexOf('?') + 1)
      : '';

  changePath(appState.currentPage, slug)();
  renderPage(appState.currentPage);
})();
