import './style.css';
import { appState } from './app/app-state';
import { changePath } from './app/router/handlers';
import { renderPage } from './app/router/render-page';
import { router } from './app/router/router';

(function (): void {
  router();
  renderPage(appState.currentPage);
  changePath(appState.currentPage)();
})();
