import type { Options } from '../../utils/create-elements/types';

import { createWrappedInput } from '../../shared/components/input';
import { INPUT } from '../../shared/styles';
import { inputDateOfBirthValidation, inputValidation } from '../../utils/input-validation';
import {
  AGE_RESTRICTION_ERROR,
  CITY_ERROR,
  FIRST_NAME_ERROR,
  GENERAL_PATTERN,
  LAST_NAME_ERROR,
  POSTAL_CODE_ERROR,
  POSTAL_CODE_PATTERN,
  STREET_ERROR,
  STREET_PATTERN,
} from './constants';

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
        inputDateOfBirthValidation(event, AGE_RESTRICTION_ERROR);
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
        inputValidation(event, STREET_PATTERN, CITY_ERROR);
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
        inputValidation(event, GENERAL_PATTERN, FIRST_NAME_ERROR);
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
        inputValidation(event, GENERAL_PATTERN, LAST_NAME_ERROR);
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
          inputValidation(event, POSTAL_CODE_PATTERN, POSTAL_CODE_ERROR);
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
        inputValidation(event, STREET_PATTERN, STREET_ERROR);
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
