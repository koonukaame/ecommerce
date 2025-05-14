import type { Options } from '../../utils/create-elements/types';

import { REGISTRATION } from '../../pages/registration/constants';
import { createFieldset } from '../../utils/create-elements/create-tags';
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
        if (event.target instanceof HTMLInputElement) {
          console.log(`email: ${event.target.value}`);
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
        }
      },
    },
  },
};

export function createCredentials(): HTMLFieldSetElement {
  const emailInput = createWrappedInput(CREDENTIALS_INPUT_CONFIG.email);
  const passwordInput = createWrappedInput(CREDENTIALS_INPUT_CONFIG.password);

  const credentialsFieldset = createFieldset({
    children: [emailInput.container, passwordInput.container],
    classes: REGISTRATION.inputsContainer,
  });

  return credentialsFieldset;
}
