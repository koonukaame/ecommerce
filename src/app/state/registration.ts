type RegistrationErrors = Record<string, boolean | undefined>;

export const registrationErrors: RegistrationErrors = {
  billingCity: undefined,
  billingPostalCode: undefined,
  billingStreet: undefined,
  dateOfBirth: undefined,
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  password: undefined,
  shippingCity: undefined,
  shippingPostalCode: undefined,
  shippingStreet: undefined,
};
