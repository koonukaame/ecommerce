import type { Options } from "../../utils/create-elements/types";

import { countryOptions } from "../../pages/registration/constants";
import { createOption, createSelect } from "../../utils/create-elements/create-tags";
import { INPUT } from "../styles";

type Select = Record<'registrationBilling' | 'registrationShipping', SelectProps>;
type SelectProps = Pick<Options<'input'>, 'attributes' | 'children' | 'classes'>

const SELECT_CONFIG: Select = {
  registrationBilling: {
    attributes: {
      name: 'country',
    },
    children: Object.values(countryOptions).map((country) => createOption(country)),
    classes: INPUT.registration,
  },
  registrationShipping: {
    attributes: {
      name: 'country',
    },
    children: Object.values(countryOptions).map((country) => createOption(country)),
    classes: INPUT.registration,
  },
}

export const shippingSelect = createSelect(SELECT_CONFIG.registrationShipping);

export const billingSelect = createSelect(SELECT_CONFIG.registrationBilling);
