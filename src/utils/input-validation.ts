import { createErrorMessage } from '../shared/components/error-message';

export function inputValidation(event: Event, regexp: RegExp, errorMessage: string): void {
  const input = event.target;

  if (input instanceof HTMLInputElement) {
    const errorContainer = input.nextElementSibling;

    if (errorContainer instanceof HTMLElement) {
      errorContainer.replaceChildren();

      if (regexp.test(input.value)) {
        errorContainer.textContent = '';
      } else {
        createErrorMessage(errorMessage, errorContainer);
      }
    }
  }
}
