import { REGISTRATION } from '../../pages/registration/constants';
import { createFieldset } from '../../utils/create-elements/create-tags';
import { CREDENTIALS_INPUT_CONFIG } from '../ui-config/credential-inputs';
import { createWrappedInput } from './input';

export function createCredentials(): HTMLFieldSetElement {
  const emailInput = createWrappedInput(CREDENTIALS_INPUT_CONFIG.email);
  const passwordInput = createWrappedInput(CREDENTIALS_INPUT_CONFIG.password);

  const credentialsFieldset = createFieldset({
    children: [emailInput.container, passwordInput.container],
    classes: REGISTRATION.inputsContainer,
  });

  return credentialsFieldset;
}
