import type { Options } from '../../utils/create-elements/types';

import { createWrappedInput } from '../../shared/components/input';
import { INPUT } from '../../shared/styles';

export type RegistrationInputsProps = Omit<Options<'input'>, 'children' | 'parent' | 'tag' | 'text'>;
type RegistrationInputs = Record<
  'birthdate' | 'city' | 'firstname' | 'lastname' | 'postalcode' | 'street',
  RegistrationInputsProps
>;

import { createErrorMessage } from '../../shared/components/error-message';

export const REGISTRATION_INPUTS_CONFIG: RegistrationInputs = {
  birthdate: {
    attributes: {
      name: 'date',
      type: 'date',
    },
    classes: INPUT.registration,
    events: {
      change: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(event.target.value);
        }
      },
    },
  },
  city: {
    attributes: {
      name: 'city',
      placeholder: 'Enter city*',
      type: 'text',
    },
    classes: INPUT.registration,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`city: ${event.target.value}`);
        }
      },
    },
  },
  firstname: {
    attributes: {
      autocomplete: 'true',
      name: 'firstname',
      placeholder: 'Enter first name*',
      type: 'text',
    },
    classes: INPUT.registration,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`first name: ${event.target.value}`);
          createErrorMessage('Error', firstNameInput.errorContainer);
        }
      },
    },
  },
  lastname: {
    attributes: {
      name: 'lastname',
      placeholder: 'Enter last name*',
      type: 'text',
    },
    classes: INPUT.registration,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`last name: ${event.target.value}`);
        }
      },
    },
  },
  postalcode: {
    attributes: {
      name: 'postalcode',
      placeholder: 'Enter postal code*',
      type: 'text',
    },
    classes: INPUT.registration,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`postal code: ${event.target.value}`);
          createErrorMessage('Error', postalCodeInput.errorContainer);
        }
      },
    },
  },
  street: {
    attributes: {
      name: 'street',
      placeholder: 'Enter street*',
      type: 'text',
    },
    classes: INPUT.registration,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`street: ${event.target.value}`);
        }
      },
    },
  },
};

export const firstNameInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.firstname);

export const lastNameInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.lastname);

export const birthDateInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.birthdate);

export const cityInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.city);

export const postalCodeInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.postalcode);

export const streetInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.street);
