import type { CustomerDraft } from '@commercetools/platform-sdk';

import { defaultAddresses, registrationState } from '../app/state/registration';
import { sameAddress } from '../components/registration/checkbox';

const SHIPPING_ADDRESS_INDEX = 0;
const BILLING_ADDRESS_INDEX = 1;

export function prepareCustomerData(): CustomerDraft {
  const areAddressesSame = sameAddress.checked;

  const shippingAddress = {
    city: registrationState.shippingCity.value,
    country: registrationState.shippingCountry.value,
    postalCode: registrationState.shippingPostalCode.value,
    streetName: registrationState.shippingStreet.value,
  };

  const billingAddress = {
    city: registrationState.billingCity.value,
    country: registrationState.billingCountry.value,
    postalCode: registrationState.billingPostalCode.value,
    streetName: registrationState.billingStreet.value,
  };

  const addresses = [shippingAddress];
  let shippingAddresses = [SHIPPING_ADDRESS_INDEX];
  let billingAddresses = [SHIPPING_ADDRESS_INDEX];

  if (!areAddressesSame) {
    addresses.push(billingAddress);
    billingAddresses = [BILLING_ADDRESS_INDEX];
  }

  const customerDraft: CustomerDraft = {
    addresses,
    billingAddresses,
    dateOfBirth: registrationState.dateOfBirth.value,
    defaultBillingAddress: defaultAddresses.defaultBillingAddress
      ? areAddressesSame
        ? SHIPPING_ADDRESS_INDEX
        : BILLING_ADDRESS_INDEX
      : undefined,
    defaultShippingAddress: defaultAddresses.defaultShippingAddress ? SHIPPING_ADDRESS_INDEX : undefined,
    email: registrationState.email.value,
    firstName: registrationState.firstName.value,
    lastName: registrationState.lastName.value,
    password: registrationState.password.value,
    shippingAddresses,
  };

  return customerDraft;
}
