import './style.css';
import { appState } from './app/app-state';
import { renderPage } from './app/router/render-page';
import { router } from './app/router/router';
import { checkRenderPage } from './app/router/handlers';

(function (): void {
  router();
  appState.currentPage = checkRenderPage(globalThis.location.hash.slice(1).trim());
  renderPage(appState.currentPage);
  globalThis.location.hash = `#${appState.currentPage}`;
})();
