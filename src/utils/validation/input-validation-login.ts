import { loginState } from '../../app/state/login';
import { createErrorMessage } from '../../shared/components/error-message';

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
        loginState[input.name].error = false;
        loginState[input.name].value = input.value;
      } else {
        createErrorMessage(errorMessage, errorContainer);
        loginState[input.name].error = true;
      }
    }
  }
}
