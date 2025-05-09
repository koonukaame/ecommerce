import type { Options } from '../../utils/create-elements/types';

import { createA } from '../../utils/create-elements/create-tags';
import { LINK } from '../styles';

type Link = Record<'login', LinkProps>;
type LinkProps = Omit<Options<'link'>, 'children' | 'parent' | 'tag'>;

export const LINK_CONFIG: Link = {
  login: {
    classes: [...LINK.general, ...LINK.generalHover],
    events: {
      click: () => console.log('clicked: redirecting to Register page'),
    },
    text: "Don't have an account? Register",
  },
};

export const loginLink = createA(LINK_CONFIG.login);
