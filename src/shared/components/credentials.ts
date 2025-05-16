import { REGISTRATION } from '../../pages/registration/constants';
import { createFieldset } from '../../utils/create-elements/create-tags';
import { CustomEventEmitter } from '../../utils/event-emitter';
import { CREDENTIALS_INPUT_CONFIG } from '../ui-config/credential-inputs';
import { createWrappedInput } from './input';

export const togglePasswordEmitter = new CustomEventEmitter();

export function createCredentials(): HTMLFieldSetElement {
  const emailInput = createWrappedInput(CREDENTIALS_INPUT_CONFIG.email);
  const passwordInput = createWrappedInput(CREDENTIALS_INPUT_CONFIG.password);

  togglePasswordEmitter.subscribe('togglePassword', (isVisible) => {
    if (passwordInput.input instanceof HTMLInputElement) {
      passwordInput.input.type = isVisible ? 'text' : 'password';
    }
  });

  const credentialsFieldset = createFieldset({
    children: [emailInput.container, passwordInput.container],
    classes: REGISTRATION.inputsContainer,
  });

  return credentialsFieldset;
}
