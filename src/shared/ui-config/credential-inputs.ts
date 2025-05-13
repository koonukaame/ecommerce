import type { Options } from '../../utils/create-elements/types';

import { inputValidation } from '../../utils/input-validation';
import { createWrappedInput } from '../components/input';
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
        inputValidation(event, /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/, 'Invalid email format');
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
        inputValidation(event, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Invalid password format');
      },
    },
  },
};

export const emailInput = createWrappedInput(CREDENTIALS_INPUT_CONFIG.email);
export const passwordInput = createWrappedInput(CREDENTIALS_INPUT_CONFIG.password);
