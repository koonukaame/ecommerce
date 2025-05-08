import { createErrorMessage } from "../../shared/components/error-message";
import { HEADER1 } from "../../shared/styles";
import { CREDENTIALS_INPUT_CONFIG } from "../../shared/ui-configs/credential-inputs";
import { createA, createDiv, createForm, createH1, createInput, createLabel, createMain } from "../../utils/create-elements/create-tags";
import { loginButton } from "./components";
import { LOGIN } from "./constants";
import { emailInput, passwordInput } from "./input";

export function LoginPage(): HTMLElement {
  const container = createMain({ classes: LOGIN.container, parent: document.body});
  const wrapper = createDiv({ classes: LOGIN.wrapper, parent: container });

  createH1({classes: HEADER1.general, parent: wrapper, text: 'Login'});

  const emailInputWrapper = createDiv({children: [emailInput], classes: LOGIN.errorsWrapper });
  const emailInputError = createDiv({ parent: emailInputWrapper });
  createErrorMessage('Server error', emailInputError, true); //TODO: test server error; remove it when the actual code will be ready

  const passwordInputWrapper = createDiv({ children: [passwordInput], classes: LOGIN.errorsWrapper});
  createInput(CREDENTIALS_INPUT_CONFIG.password);
  const passwordInputError = createDiv({ parent: passwordInputWrapper });
  createErrorMessage('Password is too long', passwordInputError, false); //TODO: test validation error; remove it when the actual code will be ready

  const togglePasswordWrap = createDiv({ classes: LOGIN.passwordVisibility});
  createInput({ attributes: {id: 'password', type: 'checkbox' }, parent: togglePasswordWrap, });
  createLabel({ attributes: { for: 'password' }, parent: togglePasswordWrap, text: 'Show password' });

  createForm({ children: [emailInputWrapper, passwordInputWrapper, togglePasswordWrap, loginButton], classes: LOGIN.inputContainer, parent: wrapper });

  createA({ classes: LOGIN.link, events: { click: () => console.log('clicked: redirecting to Register page')}, parent: wrapper, text: "Don't have an account? Register" });

  return container;
}