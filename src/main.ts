import './style.css';
import { appState } from './app/app-state';
import { renderPage } from './utils/router/render-page';
import { router } from './utils/router/router';

(function (): void {
  router();
  renderPage(appState.currentPage);
  globalThis.location.hash = `#${appState.currentPage}`;
})();
