import type { Options } from '../../utils/create-elements/types';

import { registrationErrors } from '../../app/state/registration';
// import { form } from '../../components/registration/form';
import { createButton } from '../../utils/create-elements/create-tags';
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
        // доступ к выпадающему списку стран в форме черзе document.querySelector('form')
        let form = document.querySelector('form');

        if (!(form instanceof HTMLFormElement)) {
          return;
        }

        const shippingCountryElement = form.elements.namedItem('shippingCountry');
        const billingCountryElement = form.elements.namedItem('billingCountry');

        if (shippingCountryElement instanceof HTMLSelectElement && billingCountryElement instanceof HTMLSelectElement) {
          registrationErrors.shippingCountry = Boolean(shippingCountryElement.value);
          registrationErrors.billingCountry = Boolean(billingCountryElement.value);
          console.log(registrationErrors);
        }

        // доступ к выпадающему списку стран в форме черeз импорт функции form()
        // const shippingCountryElement = form().elements.namedItem('shippingCountry');
        // const billingCountryElement = form().elements.namedItem('billingCountry');

        // if (
        //   shippingCountryElement instanceof HTMLSelectElement &&
        //   billingCountryElement instanceof HTMLSelectElement
        // ) {
        //   registrationErrors.shippingCountry = Boolean(shippingCountryElement.value);
        //   registrationErrors.billingCountry = Boolean(billingCountryElement.value);
        //   console.log(registrationErrors);
        // }
      },
    },
    text: 'Register',
  },
};

export const mainButton = createButton(BUTTONS_CONFIG.main);

export const loginButton = createButton(BUTTONS_CONFIG.login);

export const registrationButton = createButton(BUTTONS_CONFIG.registration);
