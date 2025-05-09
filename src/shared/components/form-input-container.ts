import type { Options } from '../../utils/create-elements/types';

import { createMain } from '../../utils/create-elements/create-tags';
import { FORM_INPUT } from '../styles';

export const LOGIN_REGISTRATION_CONTAINER: Omit<Options<'main'>, 'children' | 'tag'> = {
  classes: FORM_INPUT.container,
  parent: document.body,
};

export const container = createMain(LOGIN_REGISTRATION_CONTAINER);
