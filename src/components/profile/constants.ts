import type { Options } from '../../utils/create-elements/types';

export const PROFILE_CLASSES = {
  inputsContainer: ['flex', 'flex-wrap', 'gap-x-4', 'justify-between'],
  addressBlock: ['flex', 'flex-col', 'gap', 'border', 'border-[#252525]/50', 'p-2'],
  baseButton: [
    'w-20',
    'h-10',
    'text-lg',
    'text-white',
    'rounded',
    'absolute',
    'bg-(--hover-link-header)',
    'mt-0.5',
    'mr-1.5',
    'mb-2',
    'cursor-pointer',
    'disabled:bg-(--disabled-button-color)',
    'disabled:cursor-auto',
  ],
  buttonEdit: ['cursor-pointer', 'top-1', 'right-1'],
  buttonAddressEdit: ['cursor-pointer', 'bottom-0', 'right-1'],
  buttonSave: ['mt-8', 'mb-1', 'inline', 'relative'],
  buttonCancel: ['inline', 'relative'],
  section: ['relative', 'w-full', 'border', 'border-black', 'pl-[10px]', 'pr-[10px]', 'text-[15px]'],
  label: ['text-[20px]', 'block'],
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
    'm-3',
  ],
  input: [
    'h-[45px]',
    'mt-2',
    'mr-1',
    'ml-0',
    'border',
    'border-gray-300',
    'rounded',
    'disabled:bg-gray-100',
    'disabled:text-gray-500',
    'text-[#252525]',
    'p-2',
  ],
  select: [
    'h-[45px]',
    'mt-2',
    'ml-0',
    'mr-1',
    'border',
    'border-gray-300',
    'rounded',
    'p-2',
    'flex-1',
    'min-w-[90px]',
    'max-w-[251px]',
    'appearance-none',
    'disabled:bg-gray-100',
    'disabled:text-gray-500',
    'text-[#252525]',
  ],
};

export const MESSAGES = {
  INVALID_DATA: 'Please enter valid profile information',
  INVALID_ADDRESS: 'Please enter valid address',
  INVALID_PASSWORD: 'Please enter valid password',
  INFORMATION_SAVED: 'Your information has been successfully saved',
  PASSWORD_SAVED: 'Your password has been successfully saved',
  ADDRESS_SAVED: 'Your address has been successfully saved',
};

export const SERVER_ERROR_MESSAGES = {
  EMAIL: 'Unexpected error during updating email',
  PASSWORD: 'Unexpected error during saving password',
  ADDRESS: 'Unexpected error during saving address',
};

type CountryOptions = Record<'base' | 'belarus' | 'russia', CountryOptionsProps>;
type CountryOptionsProps = Pick<Options<'option'>, 'attributes' | 'text'>;

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
