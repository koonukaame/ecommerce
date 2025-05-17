import type { Options } from '../../utils/create-elements/types';

import { defaultAddresses, isSameAddress } from '../../app/state/registration';
import { sameAddressEmitter } from '../../helpers/address-emitter';

type CountryOptions = Record<'base' | 'belarus' | 'russia', CountryOptionsProps>;

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
      value: '',
    },
    text: 'Choose country*',
  },
  belarus: {
    attributes: {
      value: 'BY',
    },
    text: 'Belarus',
  },
  russia: {
    attributes: {
      selected: 'true',
      value: 'RU',
    },
    text: 'Russia',
  },
};

export const REGISTRATION_CHECKBOXES_CONFIG: RegistrationCheckboxes = {
  defaultBillingAddress: {
    attributes: {
      id: 'default-billing-address',
      name: 'defaultBilling',
      type: 'checkbox',
    },
    events: {
      change: (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
          defaultAddresses.defaultBillingAddress = event.target.checked ? true : false;
        }
      },
    },
  },
  defaultShippingAddress: {
    attributes: {
      id: 'default-shipping-address',
      name: 'defaultShipping',
      type: 'checkbox',
    },
    events: {
      change: (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
          defaultAddresses.defaultShippingAddress = event.target.checked ? true : false;
        }
      },
    },
  },
  sameAddress: {
    attributes: {
      id: 'same-address',
      name: 'sameAddressCheckbox',
      type: 'checkbox',
    },
    events: {
      change: (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
          sameAddressEmitter.emit('sameAddress', event.target.checked);
          const billingFieldset = event.target.parentElement?.nextSibling;
          if (!(billingFieldset instanceof HTMLFieldSetElement)) {
            return;
          }

          if (event.target.checked) {
            isSameAddress.value = true;
            billingFieldset.disabled = true;
            billingFieldset.style.opacity = '0.4';
          } else {
            isSameAddress.value = false;
            billingFieldset.disabled = false;
            billingFieldset.style.opacity = '1';
          }
        }
      },
    },
  },
};
