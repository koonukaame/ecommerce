import type { Options } from '../../utils/create-elements/types';

import { Page } from '../../app/constants';
import { changePath } from '../../app/router/handlers';
import { LINK } from '../styles';

type Link = Record<'login' | 'registration' | 'catalog', LinkProps>;
type LinkProps = Omit<Options<'link'>, 'children' | 'parent' | 'tag'>;

const LINKS_CLASSES = [...LINK.general, ...LINK.generalHover];

export const LINK_CONFIG: Link = {
  login: {
    classes: LINKS_CLASSES,
    events: {
      click: changePath(Page.registration),
    },
    text: "Don't have an account? Register",
  },
  registration: {
    classes: LINKS_CLASSES,
    events: {
      click: changePath(Page.login),
    },
    text: 'Do you have an account? Login',
  },
  catalog: {
    classes: [...LINK.generalHover, ...LINK.cart],
    events: {
      click: changePath(Page.catalog),
    },
    text: 'Go to catalog',
  },
};
