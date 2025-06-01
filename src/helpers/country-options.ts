import type { Options } from '../utils/create-elements/types';

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
