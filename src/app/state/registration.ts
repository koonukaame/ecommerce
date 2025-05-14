type RegistrationErrors = Record<string, boolean | undefined>;

export const registrationErrors: RegistrationErrors = {
  billingCity: undefined,
  billingCountry: undefined,
  billingPostalCode: undefined,
  billingStreet: undefined,
  dateOfBirth: undefined,
  defaultBilling: false,
  defaultShipping: false,
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  password: undefined,
  shippingCity: undefined,
  shippingCountry: undefined,
  shippingPostalCode: undefined,
  shippingStreet: undefined,
};
