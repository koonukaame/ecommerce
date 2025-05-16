import type { Options } from '../../utils/create-elements/types';

import { type AddressType, updateInputName } from '../../helpers/update-input-name';
import { countryOptions } from '../../pages/registration/constants';
import { SELECT } from '../../shared/styles';
import { createOption, createSelect } from '../../utils/create-elements/create-tags';

type Select = Record<'countries', SelectProps>;
type SelectProps = Pick<Options<'input'>, 'attributes' | 'children' | 'classes'>;

export const SELECT_CONFIG: Select = {
  countries: {
    attributes: {
      name: 'Country',
    },
    classes: SELECT.general,
  },
};

export function createCountrySelect(addressType: AddressType): HTMLSelectElement {
  const select = createSelect(SELECT_CONFIG.countries);
  const options = Object.values(countryOptions).map((element) => createOption(element));
  select.append(...options);
  updateInputName(select, addressType);
  return select;
}
