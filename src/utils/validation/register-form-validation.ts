import { registrationState, sameAddress } from '../../app/state/registration';

export function validateRegistrationForm(): boolean {
  if (sameAddress.sameAddress) {
    registrationState.billingCity.error = false;
    registrationState.billingCountry.error = false;
    registrationState.billingPostalCode.error = false;
    registrationState.billingStreet.error = false;
  }

  // delete these lines when I merge Maria's branch with right functionality of select element
  registrationState.shippingCountry.error = false;
  registrationState.billingCountry.error = false;
  registrationState.shippingCountry.value = 'BY';
  registrationState.billingCountry.value = 'RU';
  // end

  const isFormValid = Object.values(registrationState).every((value) => value.error === false);

  console.log('Form validation', registrationState);
  console.log('Is form valid?', isFormValid);

  return isFormValid;
}
