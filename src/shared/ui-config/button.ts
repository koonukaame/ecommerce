import type { Options } from '../../utils/create-elements/types';

import { loginUser } from '../../app/api';
import { Page } from '../../app/constants';
import { changePath } from '../../app/router/handlers';
import { loginState } from '../../app/state/login';
import { validateLoginForm } from '../../utils/validation/login-form-validation';
import { BUTTON } from '../styles';

type Button = Record<'login' | 'main' | 'registration', ButtonProps>;
type ButtonProps = Omit<Options<'button'>, 'children' | 'parent' | 'tag'>;

const BUTTON_CLASSES = [...BUTTON.general, ...BUTTON.generalHover, ...BUTTON.generalFocus];

export const BUTTONS_CONFIG: Button = {
  login: {
    attributes: {
      type: 'button', //TODO: It's here to prevent redirection; remove it when validation will be ready
    },
    classes: BUTTON_CLASSES,
    events: {
      click: async () => {
        const isFormValid: boolean = validateLoginForm();

        if (isFormValid) {
          const email = loginState.email.value;
          const password = loginState.password.value;

          const response = await loginUser(email, password);
          console.log(response);
        }
      },
    },
    text: 'Login',
  },
  main: {
    classes: BUTTON_CLASSES,
    events: {
      click: () => changePath(Page.main)(),
    },
    text: 'Main page',
  },
  registration: {
    attributes: {
      type: 'button', //TODO: It's here to prevent redirection; remove it when validation will be ready
    },
    classes: BUTTON_CLASSES,
    events: {
      click: () => console.log('clicked register'),
    },
    text: 'Register',
  },
};
