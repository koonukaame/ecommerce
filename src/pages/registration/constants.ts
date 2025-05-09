import type { Options } from "../../utils/create-elements/types"

import { INPUT } from "../../shared/styles";

export const REGISTRATION = {
  container: ['flex', 'justify-center', 'items-center', 'min-h-screen', 'p-3'],
  errorsWrapper: ['w-full', 'max-w-[400px]', 'p-2' ],
  inputsContainer: ['flex', 'gap-[10px]', 'w-full', 'mb-4'],
  link: ['cursor-pointer', 'duration-300', 'hover:underline'],
  wrapper: ['flex', 'flex-col', 'max-w-[600px]', 'w-full', 'items-center', 'gap-[30px]', 'p-3', 'border', 'border-[#252525]/50'],
}

type RegistrationInputs = Record<'birthdate' | 'city' | 'firstname' | 'lastname' | 'postalcode' | 'street', RegistrationInputsProps>;
type RegistrationInputsProps = Omit<Options<'input'>, 'children' | 'parent' | 'tag' | 'text'>

export const REGISTRATION_INPUTS_CONFIG: RegistrationInputs = {
  birthdate: {
    attributes: {
      type: 'date',
    },
    classes: INPUT.general,
    events: {
      change: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(event.target.value);
        }
      } 
    }
  },
  city: {
    attributes: {
      placeholder: 'Enter city',
      type: 'text',
    },
    classes: INPUT.general,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`city: ${event.target.value}`);
        }
      } 
    }
  },
  firstname: {
    attributes: {
      autocomplete: 'true',
      placeholder: 'Enter first name',
      type: 'text',
    },
    classes: INPUT.general,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`first name: ${event.target.value}`);
        }
      } 
    }
  },
  lastname: {
    attributes: {
      placeholder: 'Enter last name',
      type: 'text',
    },
    classes: INPUT.general,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`last name: ${event.target.value}`);
        }
      } 
    }
  },
  postalcode: {
    attributes: {
      placeholder: 'Enter postal code',
      type: 'text',
    },
    classes: INPUT.general,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`postal code: ${event.target.value}`);
        }
      } 
    }
  },
  street: {
    attributes: {
      placeholder: 'Enter street',
      type: 'text',
    },
    classes: INPUT.general,
    events: {
      input: (event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`street: ${event.target.value}`);
        }
      } 
    }
  },
}
