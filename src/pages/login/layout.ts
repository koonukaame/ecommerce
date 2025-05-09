import { loginButton } from '../../shared/components/button';
import { createErrorMessage } from '../../shared/components/error-message';
import { container } from '../../shared/components/form-input-container';
import { loginLink } from '../../shared/components/link';
import { HEADER2 } from '../../shared/styles';
import { CREDENTIALS_INPUT_CONFIG, emailInput, passwordInput } from '../../shared/ui-configs/credential-inputs';
import { createDiv, createForm, createH2, createInput, createLabel, } from '../../utils/create-elements/create-tags';
import { LOGIN } from './constants';

export function LoginPage(): HTMLElement {
  const heading = createH2({ classes: HEADER2.general, text: 'Login' });

  const emailInputWrapper = createDiv({ children: [emailInput], classes: LOGIN.errorsWrapper });
  const emailInputError = createDiv({ parent: emailInputWrapper });
  createErrorMessage('Server error', emailInputError, true); //TODO: test server error; remove it when the actual code will be ready

  const passwordInputWrapper = createDiv({ children: [passwordInput], classes: LOGIN.errorsWrapper });
  createInput(CREDENTIALS_INPUT_CONFIG.password);
  const passwordInputError = createDiv({ parent: passwordInputWrapper });
  createErrorMessage('Password is too long', passwordInputError, false); //TODO: test validation error; remove it when the actual code will be ready

  const togglePasswordWrap = createDiv({ classes: LOGIN.passwordVisibility });
  createInput({ attributes: { id: 'password', type: 'checkbox' }, parent: togglePasswordWrap });
  createLabel({ attributes: { for: 'password' }, parent: togglePasswordWrap, text: 'Show password' });

  const form = createForm({
    children: [emailInputWrapper, passwordInputWrapper, togglePasswordWrap, loginButton],
    classes: LOGIN.form,
  });

  createDiv({ children: [heading, form, loginLink], classes: LOGIN.wrapper, parent: container });

  return container;
}
