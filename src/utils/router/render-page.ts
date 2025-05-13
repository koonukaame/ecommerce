import type { PageType } from '../../app/types';

import { appState } from '../../app/app-state';
import { Header } from '../../components/header';
import { toggleClassesOnRedirect } from '../../helpers/toggle-classes-on-redirect';
import { ErrorPage } from '../../pages/error';
import { Main } from '../../pages/main';
import { RegistrationPage } from '../../pages/registration/registration';
import { undercunstruction } from '../../pages/undercunstruction';
import { Page } from './types';

export function renderPage(page: PageType): void {
  toggleClassesOnRedirect(appState.isLogined, page);

  document.body.textContent = '';
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
      document.body.append(RegistrationPage());
      break;
    }
    default: {
      undercunstruction();
    }
  }
}
