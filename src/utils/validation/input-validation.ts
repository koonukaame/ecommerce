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
      const ageDiff = new Date(currentDate.setFullYear(currentDate.getFullYear() - MINIMUM_AGE));

      if (birthDate > ageDiff) {
        createErrorMessage(errorMessage, errorContainer);
        registrationState[input.name].error = true;
      } else {
        errorContainer.textContent = '';
        registrationState[input.name].error = false;
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
        registrationState[input.name].error = false;
      } else {
        createErrorMessage(errorMessage, errorContainer);
        registrationState[input.name].error = true;
      }
    }
  }
}
