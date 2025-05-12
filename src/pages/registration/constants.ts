import type { Options } from '../../utils/create-elements/types';

type CountryOptions = Record<'base' | 'canada' | 'usa', CountryOptionsProps>;

type CountryOptionsProps = Pick<Options<'option'>, 'attributes' | 'text'>;
type RegistrationCheckboxes = Record<
  'defaultBillingAddress' | 'defaultShippingAddress' | 'sameAddress',
  RegistrationCheckboxesProps
>;

type RegistrationCheckboxesProps = Omit<Options<'input'>, 'children' | 'parent' | 'tag' | 'text'>;

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
      name: 'default-billing-address',
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
      name: 'default-shipping-address',
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
      name: 'same-address',
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
