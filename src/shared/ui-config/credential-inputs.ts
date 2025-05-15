import type { Options } from '../../utils/create-elements/types';

import { inputValidation } from '../../utils/validation/input-validation';
import { createWrappedInput } from '../components/input';
import { REGEX } from '../constants';
import { INPUT } from '../styles';

export type BaseInputsProps = Omit<Options<'input'>, 'children' | 'parent' | 'tag' | 'text'>;
type CredentialInputs = Record<'email' | 'password', BaseInputsProps>;

const INVALID_EMAIL_ERROR = 'Invalid email format';
const INVALID_PASSWORD_ERROR = 'Invalid password format';

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
        inputValidation(event, REGEX.EMAIL, INVALID_EMAIL_ERROR);
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
        inputValidation(event, REGEX.PASSWORD, INVALID_PASSWORD_ERROR);
      },
    },
  },
};

export const emailInput = createWrappedInput(CREDENTIALS_INPUT_CONFIG.email);
export const passwordInput = createWrappedInput(CREDENTIALS_INPUT_CONFIG.password);
