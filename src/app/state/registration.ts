import type { DefaultAddresses, RegistrationState } from '../types';

export const registrationState: RegistrationState = {
  billingCity: {
    error: undefined,
    value: '',
  },
  billingCountry: {
    error: false,
    value: 'RU',
  },
  billingPostalCode: {
    error: undefined,
    value: '',
  },
  billingStreet: {
    error: undefined,
    value: '',
  },
  dateOfBirth: {
    error: undefined,
    value: '',
  },
  email: {
    error: undefined,
    value: '',
  },
  firstName: {
    error: undefined,
    value: '',
  },
  lastName: {
    error: undefined,
    value: '',
  },
  password: {
    error: undefined,
    value: '',
  },
  shippingCity: {
    error: undefined,
    value: '',
  },
  shippingCountry: {
    error: false,
    value: 'RU',
  },
  shippingPostalCode: {
    error: undefined,
    value: '',
  },
  shippingStreet: {
    error: undefined,
    value: '',
  },
};

export const defaultAddresses: DefaultAddresses = {
  defaultBillingAddress: false,
  defaultShippingAddress: false,
};

export const isSameAddress = {
  sameAddress: false,
};
