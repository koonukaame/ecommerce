import type { Options } from '../../utils/create-elements/types';

import { loginUser, registerUser } from '../../app/api';
import { appState } from '../../app/app-state';
import { Page } from '../../app/constants';
import { changePath } from '../../app/router/handlers';
import { registrationState } from '../../app/state/input-state';
import { prepareCustomerData } from '../../utils/prepare-customer-data';
import { validateLoginForm } from '../../utils/validation/login-form-validation';
import { validateRegistrationForm } from '../../utils/validation/register-form-validation';
import { createPopupMessage } from '../components/popup';
import { SERVER_ERROR_MESSAGES } from '../constants';
import { BUTTON } from '../styles';
import { clearAllFilters } from '../../helpers/clear-filters';
import { loginAndSaveToken } from '../../app/auth-service';
import { removeFromCart } from '../../utils/cart-actions/remove-from-cats';
import { addToCart } from '../../utils/cart-actions/add-to-cart';

type Button = Record<'login' | 'main' | 'registration' | 'reset' | 'addToCart' | 'removeFromCart', ButtonProps>;
type ButtonProps = Omit<Options<'button'>, 'children' | 'parent' | 'tag'>;

const BUTTON_CLASSES = [...BUTTON.general, ...BUTTON.generalHover, ...BUTTON.generalFocus];

export const BUTTONS_CONFIG: Button = {
  login: {
    attributes: {
      type: 'button',
    },
    classes: BUTTON_CLASSES,
    events: {
      click: async (event: Event) => {
        event.preventDefault();
        const isFormValid: boolean = validateLoginForm();

        if (!isFormValid) {
          return;
        }

        const { email, password } = registrationState;

        try {
          const response = await loginUser(email.value, password.value);
          loginAndSaveToken(email.value, password.value);

          if ('id' in response) {
            createPopupMessage(`Welcome back, ${response.firstName}!`, true);
            appState.isLogined = true;
            changePath(Page.main)();
            return;
          }

          const message =
            response.message === SERVER_ERROR_MESSAGES.CUSTOMER_NOT_FOUND
              ? SERVER_ERROR_MESSAGES.WRONG_CREDENTIALS
              : response.message;

          createPopupMessage(message, false);
        } catch {
          createPopupMessage(SERVER_ERROR_MESSAGES.UNEXPECTED_ERROR, false);
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
      type: 'button',
    },
    classes: BUTTON_CLASSES,
    events: {
      click: async (event: Event) => {
        event.preventDefault();
        const isFormValid: boolean = validateRegistrationForm();

        if (!isFormValid) {
          return;
        }

        const customerDraft = prepareCustomerData();

        try {
          const response = await registerUser(customerDraft);

          if ('id' in response) {
            createPopupMessage(`Welcome, ${response.firstName}! Your account has been created.`, true);

            if (customerDraft.email && customerDraft.password) {
              loginAndSaveToken(customerDraft.email, customerDraft.password);
            }

            appState.isLogined = true;
            changePath(Page.main)();
            return;
          }

          createPopupMessage(response.message, false);
        } catch {
          createPopupMessage(SERVER_ERROR_MESSAGES.UNEXPECTED_ERROR, false);
        }
      },
    },
    text: 'Register',
  },
  reset: {
    text: 'Reset filters',
    classes: [...BUTTON_CLASSES, 'max-h-[35px]', 'text-sm'],
    events: {
      click: () => clearAllFilters(),
    },
  },
  addToCart: {
    classes: [...BUTTON.general, ...BUTTON.generalHover, ...BUTTON.generalFocus, ...BUTTON.generalDisabled],
    events: {
      click: (event: Event) => {
        if (event.target instanceof HTMLButtonElement) {
          addToCart(event.target);
        }
      },
    },
    text: 'Add to Cart',
  },
  removeFromCart: {
    classes: [
      ...BUTTON.general,
      ...BUTTON.generalHover,
      ...BUTTON.generalFocus,
      ...BUTTON.generalDisabled,
      'mt-[15px]',
    ],
    events: {
      click: (event: Event) => {
        if (event.target instanceof HTMLButtonElement) {
          removeFromCart(event.target);
        }
      },
    },
    text: 'Remove from Cart',
  },
};
