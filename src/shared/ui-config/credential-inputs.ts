import type { Options } from '../../utils/create-elements/types';

import { inputValidation } from '../../utils/input-validation';
import { createWrappedInput } from '../components/input';
import { INPUT } from '../styles';

export type BaseInputsProps = Omit<Options<'input'>, 'children' | 'parent' | 'tag' | 'text'>;
type CredentialInputs = Record<'email' | 'password', BaseInputsProps>;

const EMAIL_PATTERN = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
const INVALID_EMAIL_ERROR = 'Invalid email format';
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
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
      focusout: (event) => {
        inputValidation(event, EMAIL_PATTERN, INVALID_EMAIL_ERROR);
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
      focusout: (event) => {
        inputValidation(event, PASSWORD_PATTERN, INVALID_PASSWORD_ERROR);
      },
    },
  },
};

export const emailInput = createWrappedInput(CREDENTIALS_INPUT_CONFIG.email);
export const passwordInput = createWrappedInput(CREDENTIALS_INPUT_CONFIG.password);
