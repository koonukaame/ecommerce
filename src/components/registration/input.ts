import type { Options } from '../../utils/create-elements/types';

import { createWrappedInput } from '../../shared/components/input';
import { INPUT } from '../../shared/styles';
import { inputValidation } from '../../utils/input-validation';

export type RegistrationInputsProps = Omit<Options<'input'>, 'children' | 'parent' | 'tag' | 'text'>;
type RegistrationInputs = Record<
  'birthdate' | 'city' | 'firstname' | 'lastname' | 'postalcode' | 'street',
  RegistrationInputsProps
>;

const GENERAL_PATTERN = /^[A-Za-z]+$/;
const FIRST_NAME_ERROR = 'Invalid first name format';
const LAST_NAME_ERROR = 'Invalid last name format';
const CITY_ERROR = 'Invalid city format';
const POSTAL_CODE_PATTERN = /^\d{6}$/;
const POSTAL_CODE_ERROR = 'Invalid postal code format';
const STREET_PATTERN = /.+/;
const STREET_ERROR = 'Invalid street format';

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
