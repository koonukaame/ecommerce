import type { Options } from '../../utils/create-elements/types';

import { LINK } from '../styles';

type Link = Record<'login' | 'registration', LinkProps>;
type LinkProps = Omit<Options<'link'>, 'children' | 'parent' | 'tag'>;

const LINKS_CLASSES = [...LINK.general, ...LINK.generalHover];

export const LINK_CONFIG: Link = {
  login: {
    classes: LINKS_CLASSES,
    events: {
      click: () => console.log('clicked: redirecting to Register page'),
    },
    text: "Don't have an account? Register",
  },
  registration: {
    classes: LINKS_CLASSES,
    events: {
      click: () => console.log('clicked: redirecting to Login page'),
    },
    text: 'Do you have an account? Login',
  },
};
