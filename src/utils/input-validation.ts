import { registrationErrors } from '../app/state/registration';
import { createErrorMessage } from '../shared/components/error-message';

const MINIMUM_AGE = 13;

export function inputDateOfBirthValidation(event: Event, errorMessage: string): void {
  const input = event.target;

  if (input instanceof HTMLInputElement) {
    const errorContainer = input.nextElementSibling;

    if (errorContainer instanceof HTMLElement) {
      errorContainer.replaceChildren();

      const inputDate = input.value;
      const birthDate = new Date(inputDate);
      const currentDate = new Date();
      const ageDiff = new Date(currentDate.setFullYear(currentDate.getFullYear() - MINIMUM_AGE));

      if (birthDate > ageDiff) {
        createErrorMessage(errorMessage, errorContainer);
        registrationErrors[input.name] = false;
      } else {
        errorContainer.textContent = '';
        registrationErrors[input.name] = true;
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

      input.value = value.replaceAll(/\s+/g, '');

      if (regexp.test(input.value)) {
        errorContainer.textContent = '';
        registrationErrors[input.name] = true;
      } else {
        createErrorMessage(errorMessage, errorContainer);
        registrationErrors[input.name] = false;
      }
    }
  }
}
