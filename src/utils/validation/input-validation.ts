import { registrationState } from '../../app/state/registration';
import { createErrorMessage } from '../../shared/components/error-message';

const MINIMUM_AGE = 13;

export function dateOfBirthValidation(event: Event, errorMessage: string): void {
  const input = event.target;

  if (input instanceof HTMLInputElement) {
    const errorContainer = input.nextElementSibling;

    if (errorContainer instanceof HTMLElement) {
      errorContainer.replaceChildren();

      const inputDate = input.value;
      const birthDate = new Date(inputDate);
      const currentDate = new Date();
      const minBirthDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - MINIMUM_AGE));

      if (birthDate > minBirthDate) {
        createErrorMessage(errorMessage, errorContainer);
        registrationState[input.name].error = true;
      } else {
        errorContainer.textContent = '';
        registrationState[input.name].error = false;
        registrationState[input.name].value = input.value;
      }
    }
  }
}

export function inputValidation(event: Event, regexp: RegExp, errorMessage: string): void {
  const input = event.target;

  if (input instanceof HTMLInputElement) {
    const errorContainer = input.nextElementSibling;

    if (errorContainer instanceof HTMLElement) {
      errorContainer.replaceChildren();
      const value = input.value;

      if (
        input.name === 'shippingPostalCode' ||
        input.name === 'billingPostalCode' ||
        input.name === 'password' ||
        input.name === 'email'
      ) {
        input.value = value.replaceAll(/\s+/g, '');
      }

      if (regexp.test(input.value)) {
        errorContainer.textContent = '';
        registrationState[input.name].error = false;
        registrationState[input.name].value = input.value.trim();
        registrationState[input.name].rawValue = input.value;
      } else {
        createErrorMessage(errorMessage, errorContainer);
        registrationState[input.name].error = true;
        registrationState[input.name].rawValue = input.value;
      }
    }
  }
}
