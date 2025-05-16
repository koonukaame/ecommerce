import type { BaseInputsProps } from '../../shared/ui-config/credential-inputs';
import type { Options } from '../../utils/create-elements/types';

import { type AddressType, updateInputName } from '../../helpers/update-input-name';
import { REGISTRATION } from '../../pages/registration/constants';
import { createWrappedInput, type WrappedInput } from '../../shared/components/input';
import { ERROR_MESSAGES, REGEX } from '../../shared/constants';
import { INPUT } from '../../shared/styles';
import { createFieldset } from '../../utils/create-elements/create-tags';
import { dateOfBirthValidation, inputValidation } from '../../utils/validation/input-validation';

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
        dateOfBirthValidation(event, ERROR_MESSAGES.AGE_RESTRICTION);
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
        inputValidation(event, REGEX.STREET, ERROR_MESSAGES.CITY);
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
        inputValidation(event, REGEX.GENERAL, ERROR_MESSAGES.FIRST_NAME);
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
        inputValidation(event, REGEX.GENERAL, ERROR_MESSAGES.LAST_NAME);
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
          inputValidation(event, REGEX.POSTAL_CODE, ERROR_MESSAGES.POSTAL_CODE);
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
        inputValidation(event, REGEX.STREET, ERROR_MESSAGES.STREET);
      },
    },
  },
};

export function createAddressInput(
  inputConfig: BaseInputsProps | RegistrationInputsProps,
  addressType: AddressType,
): WrappedInput {
  const wrappedInput = createWrappedInput(inputConfig);
  updateInputName(wrappedInput.input, addressType);
  return wrappedInput;
}

export function createPersonalInfoFieldset(): HTMLFieldSetElement {
  const firstNameInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.firstname);
  const lastNameInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.lastname);
  const birthDateInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.birthdate);

  return createFieldset({
    children: [firstNameInput.container, lastNameInput.container, birthDateInput.container],
    classes: REGISTRATION.inputsContainer,
  });
}
