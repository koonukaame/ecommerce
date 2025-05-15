import { registrationState } from '../app/state/registration';
import { sameAddress } from '../components/registration/checkbox';

export function validateRegistrationForm(): boolean {
  if (sameAddress.checked) {
    registrationState.billingCity.error = false;
    registrationState.billingCountry.error = false;
    registrationState.billingPostalCode.error = false;
    registrationState.billingStreet.error = false;
  }

  const isAllFormFieldsValid = Object.values(registrationState).every((value) => value.error === false);

  console.log('Form validation', registrationState);
  console.log('Is form valid?', isAllFormFieldsValid);

  return isAllFormFieldsValid;
}
