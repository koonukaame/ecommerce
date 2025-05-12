import type { Options } from '../../utils/create-elements/types';

import { createWrappedInput } from '../../shared/components/input';
import { INPUT } from '../../shared/styles';

export type RegistrationInputsProps = Omit<Options<'input'>, 'children' | 'parent' | 'tag' | 'text'>;
type RegistrationInputs = Record<
  'birthdate' | 'city' | 'firstname' | 'lastname' | 'postalcode' | 'street',
  RegistrationInputsProps
>;

export const REGISTRATION_INPUTS_CONFIG: RegistrationInputs = {
  birthdate: {
    attributes: {
      name: 'dateOfBirth',
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
      name: 'City',
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
      name: 'firstName',
      placeholder: 'Enter first name*',
      type: 'text',
    },
    classes: INPUT.registration,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`first name: ${event.target.value}`);
        }
      },
    },
  },
  lastname: {
    attributes: {
      name: 'lastName',
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
      name: 'PostalCode',
      placeholder: 'Enter postal code*',
      type: 'text',
    },
    classes: INPUT.registration,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`postal code: ${event.target.value}`);
        }
      },
    },
  },
  street: {
    attributes: {
      name: 'Street',
      placeholder: 'Enter street*',
      type: 'text',
    },
    classes: INPUT.registration,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement && event.target.nextSibling instanceof HTMLElement) {
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
