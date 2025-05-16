import type { DefaultAddresses, RegistrationState } from '../types';

export const registrationState: RegistrationState = {
  billingCity: {
    error: undefined,
    value: '',
  },
  billingCountry: {
    error: undefined,
    value: '',
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
    error: undefined,
    value: '',
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
