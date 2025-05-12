import type { Options } from '../../utils/create-elements/types';

import { countryOptions } from '../../pages/registration/constants';
import { createOption, createSelect } from '../../utils/create-elements/create-tags';
import { SELECT } from '../styles';

type Select = Record<'countries', SelectProps>;
type SelectProps = Pick<Options<'input'>, 'attributes' | 'children' | 'classes'>;

const SELECT_CONFIG: Select = {
  countries: {
    attributes: {
      name: 'Country',
    },
    children: Object.values(countryOptions).map((country) => createOption(country)),
    classes: SELECT.general,
  },
};

export const countriesSelect = createSelect(SELECT_CONFIG.countries);
