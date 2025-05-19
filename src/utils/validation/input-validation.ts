import { registrationState } from '../../app/state/input-state';
import { createErrorMessage } from '../../shared/components/error-message';
import { REGEX } from '../../shared/constants';

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

export function validateBillingFields(name: string, value: string): boolean {
  switch (name) {
    case 'billingCity': {
      return REGEX.GENERAL.test(value.trim());
    }
    case 'billingPostalCode': {
      return REGEX.POSTAL_CODE.test(value.trim());
    }
    case 'billingStreet': {
      return REGEX.STREET.test(value.trim());
    }
    default: {
      return true;
    }
  }
}
