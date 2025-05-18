import type { Options } from '../../utils/create-elements/types';

import { loginUser, registerUser } from '../../app/api';
import { Page } from '../../app/constants';
import { changePath } from '../../app/router/handlers';
import { registrationState } from '../../app/state/input-state';
import { prepareCustomerData } from '../../utils/prepare-customer-data';
import { validateLoginForm } from '../../utils/validation/login-form-validation';
import { validateRegistrationForm } from '../../utils/validation/register-form-validation';
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
          const email = registrationState.email.value;
          const password = registrationState.password.value;

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
      click: async () => {
        const isFormValid: boolean = validateRegistrationForm();

        if (isFormValid) {
          const customerDraft = prepareCustomerData();

          const response = await registerUser(customerDraft);
          console.log(response);
        }
      },
    },
    text: 'Register',
  },
};
