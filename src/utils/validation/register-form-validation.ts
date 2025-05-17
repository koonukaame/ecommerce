import { isSameAddress, registrationState } from '../../app/state/registration';

export function validateRegistrationForm(): boolean {
  if (isSameAddress.value) {
    registrationState.billingCity.error = false;
    registrationState.billingCountry.error = false;
    registrationState.billingPostalCode.error = false;
    registrationState.billingStreet.error = false;
  }

  const isFormValid = Object.values(registrationState).every((value) => value.error === false);

  console.log('Form validation', registrationState);
  console.log('Is form valid?', isFormValid);

  return isFormValid;
}
