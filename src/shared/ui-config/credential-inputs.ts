import type { Options } from '../../utils/create-elements/types';

import { registrationState } from '../../app/state/registration';
import { inputValidation } from '../../utils/validation/input-validation';
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
      input: (event: Event) => {
        inputValidation(event, REGEX.EMAIL_DOMAIN_NAME, ERROR_MESSAGES.EMAIL_DOMAIN_NAME);
        if (!registrationState.email.error) {
          inputValidation(event, REGEX.EMAIL_AT, ERROR_MESSAGES.EMAIL_AT);
        }
        if (!registrationState.email.error) {
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
      input: (event: Event) => {
        inputValidation(event, REGEX.PASSWORD_LOWERCASE, ERROR_MESSAGES.PASSWORD_LOWERCASE);
        if (!registrationState.password.error) {
          inputValidation(event, REGEX.PASSWORD_UPPERCASE, ERROR_MESSAGES.PASSWORD_UPPERCASE);
        }
        if (!registrationState.password.error) {
          inputValidation(event, REGEX.PASSWORD_NUMBER, ERROR_MESSAGES.PASSWORD_NUMBER);
        }
        if (!registrationState.password.error) {
          inputValidation(event, REGEX.PASSWORD_LENGTH, ERROR_MESSAGES.PASSWORD_LENGTH);
        }
      },
    },
  },
};
