import type { Options } from '../../utils/create-elements/types';

import { Page } from '../../app/constants';
import { changePath } from '../../app/router/handlers';
import { createA } from '../../utils/create-elements/create-tags';
import { LINK } from '../styles';

type Link = Record<'login' | 'registration', LinkProps>;
type LinkProps = Omit<Options<'link'>, 'children' | 'parent' | 'tag'>;

export const LINK_CONFIG: Link = {
  login: {
    classes: [...LINK.general, ...LINK.generalHover],
    events: {
      click: changePath(Page.registration),
    },
    text: "Don't have an account? Register",
  },
  registration: {
    classes: [...LINK.general, ...LINK.generalHover],
    events: {
      click: () => console.log('clicked: redirecting to Login page'),
    },
    text: 'Do you have an account? Login',
  },
};

export const loginLink = createA(LINK_CONFIG.login);

export const registrationLink = createA(LINK_CONFIG.registration);
