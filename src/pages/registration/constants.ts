import type { Options } from '../../utils/create-elements/types';

import { INPUT } from '../../shared/styles';

export type RegistrationInputsProps = Omit<Options<'input'>, 'children' | 'parent' | 'tag' | 'text'>;
type CountryOptions = Record<'base' | 'canada' | 'usa', CountryOptionsProps>;

type CountryOptionsProps = Pick<Options<'option'>, 'attributes' | 'text'>;
type RegistrationCheckboxes = Record<
  'defaultBillingAddress' | 'defaultShippingAddress' | 'sameAddress',
  RegistrationCheckboxesProps
>;

type RegistrationCheckboxesProps = Omit<Options<'input'>, 'children' | 'parent' | 'tag' | 'text'>;
type RegistrationInputs = Record<
  'birthdate' | 'city' | 'firstname' | 'lastname' | 'postalcode' | 'street',
  RegistrationInputsProps
>;

export const REGISTRATION = {
  addressBlock: ['flex', 'flex-col', 'gap-1', 'border', 'border-[#252525]/50', 'p-2'],
  form: ['flex', 'flex-col', 'w-full', 'items-center', 'gap-4'],
  inputsContainer: ['flex', 'gap-[10px]', 'w-full', 'flex-wrap', 'align-center'],
  wrapper: [
    'flex',
    'flex-col',
    'max-w-[600px]',
    'w-full',
    'items-center',
    'gap-[30px]',
    'p-3',
    'border',
    'border-[#252525]/50',
  ],
};

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

export const countryOptions: CountryOptions = {
  base: {
    attributes: {
      disabled: 'true',
      selected: 'true',
      value: '',
    },
    text: 'Choose country*',
  },
  canada: {
    attributes: {
      value: 'ru',
    },
    text: 'Russia',
  },
  usa: {
    attributes: {
      value: 'bel',
    },
    text: 'Belarus',
  },
};

export const REGISTRATION_CHECKBOXES_CONFIG: RegistrationCheckboxes = {
  defaultBillingAddress: {
    attributes: {
      id: 'default-billing-address',
      type: 'checkbox',
    },
    events: {
      change: (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`Set as default billing address: ${event.target.checked}`);
        }
      },
    },
  },
  defaultShippingAddress: {
    attributes: {
      id: 'default-shipping-address',
      type: 'checkbox',
    },
    events: {
      change: (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`Set as default shipping address: ${event.target.checked}`);
        }
      },
    },
  },
  sameAddress: {
    attributes: {
      id: 'same-address',
      type: 'checkbox',
    },
    events: {
      change: (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
          console.log(`Set as same address: ${event.target.checked}`);
        }
      },
    },
  },
};
