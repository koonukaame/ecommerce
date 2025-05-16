import type { BaseInputsProps } from '../../shared/ui-config/credential-inputs';
import type { Options } from '../../utils/create-elements/types';

import { type AddressType, updateInputName } from '../../helpers/update-input-name';
import { REGISTRATION } from '../../pages/registration/constants';
import { createWrappedInput, type WrappedInput } from '../../shared/components/input';
import { INPUT } from '../../shared/styles';
import { createFieldset } from '../../utils/create-elements/create-tags';

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
