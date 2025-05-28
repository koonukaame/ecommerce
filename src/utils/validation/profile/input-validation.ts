import { profileDataState } from '../../../app/state/profile/profile-state';
import { createErrorMessage } from '../../../shared/components/error-message';
import { MINIMUM_AGE } from '../../../shared/constants';

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

      const isValidDateFormat = Number.isNaN(birthDate.getTime());

      if (isValidDateFormat || birthDate > minBirthDate) {
        createErrorMessage(errorMessage, errorContainer);
        profileDataState[input.name].error = true;
      } else {
        errorContainer.textContent = '';
        profileDataState[input.name].error = false;
        profileDataState[input.name].value = input.value;
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

      if (input.name === 'email') {
        input.value = value.replaceAll(/\s+/g, '');
      }

      if (regexp.test(input.value)) {
        errorContainer.textContent = '';
        profileDataState[input.name].error = false;
        profileDataState[input.name].value = input.value.trim();
        profileDataState[input.name].rawValue = input.value;
      } else {
        createErrorMessage(errorMessage, errorContainer);
        profileDataState[input.name].error = true;
        profileDataState[input.name].rawValue = input.value;
      }
    }
  }
}
