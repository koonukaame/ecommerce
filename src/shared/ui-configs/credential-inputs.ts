import type { Options } from '../../utils/create-elements/types';

import { createInput } from '../../utils/create-elements/create-tags';
import { INPUT } from '../styles';

type BaseInputsProps = Omit<Options<'input'>, 'children' | 'parent' | 'tag' | 'text'>;
type CredentialInputs = Record<'email' | 'password', BaseInputsProps>;

export const CREDENTIALS_INPUT_CONFIG: CredentialInputs = {
  email: {
    attributes: {
      autocomplete: 'true',
      placeholder: 'Enter email*',
      type: 'email',
    },
    classes: INPUT.general,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`email: ${event.target.value}`);
        }
      },
    },
  },
  password: {
    attributes: {
      autocomplete: 'true',
      placeholder: 'Enter password*',
      type: 'password',
    },
    classes: INPUT.general,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`password: ${event.target.value}`);
        }
      },
    },
  },
};

export const emailInput = createInput(CREDENTIALS_INPUT_CONFIG.email);

export const passwordInput = createInput(CREDENTIALS_INPUT_CONFIG.password);
