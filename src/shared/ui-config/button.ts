import type { Options } from '../../utils/create-elements/types';

import { Page } from '../../app/constants';
import { changePath } from '../../app/router/handlers';
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
      click: () => changePath(Page.main)(),
    },
    text: 'Main page',
  },
  registration: {
    attributes: {
      type: 'button', //TODO: It's here to prevent redirection; remove it when validation will be ready
    },
    classes: [...BUTTON.general, ...BUTTON.generalHover, ...BUTTON.generalFocus],
    events: {
      click: () => console.log('clicked register'),
    },
    text: 'Register',
  },
};
