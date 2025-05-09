import type { Options } from '../../utils/create-elements/types';

import { createButton } from '../../utils/create-elements/create-tags';
import { BUTTON } from '../styles';

type Button = Record<'login', ButtonProps>;
type ButtonProps = Omit<Options<'button'>, 'children' | 'parent' | 'tag'>;

export const BUTTONS_CONFIG: Button = {
  login: {
    attributes: {
      type: 'button', //TODO: It's here to prevent redirection; remove it when validation will be ready
    },
    classes: [...BUTTON.general, ...BUTTON.generalHover, ...BUTTON.generalFocus],
    events: {
      click: () => console.log('clicked: redirecting to Login page'),
    },
    text: 'Login',
  },
};

export const loginButton = createButton(BUTTONS_CONFIG.login);
