import type { Options } from '../../utils/create-elements/types';

import { inputValidation } from '../../utils/validation/input-validation';
import { REGEX } from '../constants';
import { INPUT } from '../styles';

export type BaseInputsProps = Omit<Options<'input'>, 'children' | 'parent' | 'tag' | 'text'>;
type CredentialInputs = Record<'email' | 'password', BaseInputsProps>;

const INVALID_EMAIL_ERROR = 'A properly formatted email address (must include @ and domain name)';
const INVALID_PASSWORD_ERROR =
  'Minimum 8 characters (must include at least 1 number, 1 uppercase and 1 lowercase letter)';

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
