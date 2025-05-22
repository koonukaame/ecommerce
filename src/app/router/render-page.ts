import type { PageType } from '../types';

import { toggleClassesOnRedirect } from '../../helpers/toggle-classes-on-redirect';
import { ErrorPage } from '../../pages/error';
import { LoginPage } from '../../pages/login';
import { Main } from '../../pages/main';
import { RegistrationPage } from '../../pages/registration/registration';
import { underconstruction } from '../../pages/underconstruction';
import { container } from '../../shared/components/container';
import { appState } from '../app-state';
import { Page } from '../constants';
import { ProductPage } from '../../pages/product';

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
    case Page.product: {
      ProductPage();
      break;
    }
    case Page.registration: {
      RegistrationPage();
      break;
    }
    default: {
      underconstruction();
    }
  }
}
