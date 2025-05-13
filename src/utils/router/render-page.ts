import type { PageType } from '../../app/types';

import { appState } from '../../app/app-state';
import { Page } from '../../app/constants';
import { Header } from '../../components/header';
import { toggleClassesOnRedirect } from '../../helpers/toggle-classes-on-redirect';
import { ErrorPage } from '../../pages/error';
import { Main } from '../../pages/main';
import { RegistrationPage } from '../../pages/registration/registration';
import { underconstruction } from '../../pages/underconstruction';

export function renderPage(page: PageType): void {
  toggleClassesOnRedirect(appState.isLogined, page);

  document.body.replaceChildren();
  Header();
  switch (page) {
    case Page.error: {
      ErrorPage();
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
    default: {
      underconstruction();
    }
  }
}
