import { registrationErrors } from '../app/state/registration';
import { sameAddress } from '../components/registration/checkbox';

export function validateRegistrationForm(): boolean {
  if (sameAddress.checked) {
    registrationErrors.billingCity = true;
    registrationErrors.billingCountry = true;
    registrationErrors.billingPostalCode = true;
    registrationErrors.billingStreet = true;
  }

  const isAllFormFieldsValid = Object.values(registrationErrors).every((value) => value === true);

  console.log('Form validation', registrationErrors);
  console.log('Is form valid?', isAllFormFieldsValid);

  return isAllFormFieldsValid;
}
