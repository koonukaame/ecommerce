import type { Options } from '../../utils/create-elements/types';

import { registerUser } from '../../app/api';
import { defaultAddresses } from '../../app/state/registration';
import { createButton } from '../../utils/create-elements/create-tags';
import { prepareCustomerData } from '../../utils/prepare-customer-data';
import { validateRegistrationForm } from '../../utils/validation/register-form-validation';
import { BUTTON } from '../styles';

type Button = Record<'login' | 'main' | 'registration', ButtonProps>;
type ButtonProps = Omit<Options<'button'>, 'children' | 'parent' | 'tag'>;

export const BUTTONS_CONFIG: Button = {
  login: {
    attributes: {
      type: 'button', //TODO: It's here to prevent redirection; remove it when validation will be ready
    },
    classes: [...BUTTON.general, ...BUTTON.generalHover, ...BUTTON.generalFocus],
    events: {
      click: () => console.log('clicked login'),
    },
    text: 'Login',
  },
  main: {
    classes: [...BUTTON.general, ...BUTTON.generalHover, ...BUTTON.generalFocus],
    events: {
      click: () => console.log('clicked main'),
    },
    text: 'Main page',
  },
  registration: {
    attributes: {
      type: 'button', //TODO: It's here to prevent redirection; remove it when validation will be ready
    },
    classes: [...BUTTON.general, ...BUTTON.generalHover, ...BUTTON.generalFocus],
    events: {
      click: () => {
        const isFormValid: boolean = validateRegistrationForm();
        console.log(isFormValid);
        console.log(defaultAddresses);

        if (isFormValid) {
          const customerDraft = prepareCustomerData();

          registerUser(customerDraft).then(console.log).catch(console.log);
        }
      },
    },
    text: 'Register',
  },
};

export const mainButton = createButton(BUTTONS_CONFIG.main);

export const loginButton = createButton(BUTTONS_CONFIG.login);

export const registrationButton = createButton(BUTTONS_CONFIG.registration);
