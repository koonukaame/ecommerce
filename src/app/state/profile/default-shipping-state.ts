import type { ProfileDataState } from '../../types';

export const defaultShippingState: ProfileDataState = {
  country: {
    error: undefined,
    rawValue: '',
    value: '',
  },
  city: {
    error: undefined,
    rawValue: '',
    value: '',
  },
  streetName: {
    error: undefined,
    rawValue: '',
    value: '',
  },
  postalCode: {
    error: undefined,
    rawValue: '',
    value: '',
  },
};
