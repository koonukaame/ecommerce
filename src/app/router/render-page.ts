import type { PageType } from '../types';

import { toggleClassesOnRedirect } from '../../helpers/toggle-classes-on-redirect';
import { ErrorPage } from '../../pages/error';
import { LoginPage } from '../../pages/login';
import { CatalogPage } from '../../pages/catalog';
import { Main } from '../../pages/main';
import { RegistrationPage } from '../../pages/registration/registration';
import { underconstruction } from '../../pages/underconstruction';
import { container } from '../../shared/components/container';
import { appState } from '../app-state';
import { Page } from '../constants';

export function renderPage(page: PageType): void {
  toggleClassesOnRedirect(appState.isLogined, page);
  container.replaceChildren();

  switch (page) {
    case Page.error: {
      ErrorPage();
      break;
    }
    case Page.login: {
      LoginPage();
      break;
    }
    case Page.main: {
      Main();
      break;
    }
    case Page.registration: {
      RegistrationPage();
      break;
    }
    case Page.catalog: {
      CatalogPage();
      break;
    }
    default: {
      underconstruction();
    }
  }
}
