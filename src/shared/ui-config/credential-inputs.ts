import type { Options } from '../../utils/create-elements/types';

import { inputValidation } from '../../utils/validation/login-form-validation';
import { ERROR_MESSAGES, REGEX } from '../constants';
import { INPUT } from '../styles';

export type BaseInputsProps = Omit<Options<'input'>, 'children' | 'parent' | 'tag' | 'text'>;
type CredentialInputs = Record<'email' | 'password', BaseInputsProps>;

export const CREDENTIALS_INPUT_CONFIG: CredentialInputs = {
  email: {
    attributes: {
      autocomplete: 'true',
      name: 'email',
      placeholder: 'Enter email*',
      type: 'email',
    },
    classes: INPUT.registration,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`email: ${event.target.value}`);
          inputValidation(event, REGEX.EMAIL, ERROR_MESSAGES.EMAIL);
        }
      },
    },
  },
  password: {
    attributes: {
      autocomplete: 'true',
      name: 'password',
      placeholder: 'Enter password*',
      type: 'password',
    },
    classes: INPUT.registration,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`password: ${event.target.value}`);
          inputValidation(event, REGEX.PASSWORD, ERROR_MESSAGES.PASSWORD);
        }
      },
    },
  },
};
