import type { DefaultAddresses, RegistrationState } from '../types';

export const registrationState: RegistrationState = {
  billingCity: {
    error: undefined,
    rawValue: '',
    value: '',
  },
  billingCountry: {
    error: false,
    rawValue: '',
    value: 'RU',
  },
  billingPostalCode: {
    error: undefined,
    rawValue: '',
    value: '',
  },
  billingStreet: {
    error: undefined,
    rawValue: '',
    value: '',
  },
  dateOfBirth: {
    error: undefined,
    rawValue: '',
    value: '',
  },
  email: {
    error: undefined,
    rawValue: '',
    value: '',
  },
  firstName: {
    error: undefined,
    rawValue: '',
    value: '',
  },
  lastName: {
    error: undefined,
    rawValue: '',
    value: '',
  },
  password: {
    error: undefined,
    rawValue: '',
    value: '',
  },
  shippingCity: {
    error: undefined,
    rawValue: '',
    value: '',
  },
  shippingCountry: {
    error: false,
    rawValue: '',
    value: 'RU',
  },
  shippingPostalCode: {
    error: undefined,
    rawValue: '',
    value: '',
  },
  shippingStreet: {
    error: undefined,
    rawValue: '',
    value: '',
  },
};

export const defaultAddresses: DefaultAddresses = {
  defaultBillingAddress: false,
  defaultShippingAddress: false,
};

export const isSameAddress = {
  value: false,
};
