import { createFunctionalityButton } from "../../shared/components/button";
import { createErrorMessage } from "../../shared/components/error-message";
import { createInputField } from "../../shared/components/input";
import { HEADER1, LOGIN } from "../../shared/styles";
import { createA, createDiv, createForm, createH1, createInput, createLabel, createMain } from "../../utils/create-elements/create-tags";

export function LoginPage(): HTMLElement {
  const container = createMain({ classes: LOGIN.container, parent: document.body});
  const wrapper = createDiv({ classes: LOGIN.wrapper, parent: container });

  createH1({classes: HEADER1.general, parent: wrapper, text: 'Login'});

  const inputsContainer = createForm({ classes: LOGIN.inputContainer, parent: wrapper });

  const emailInputWrapper = createDiv({classes: LOGIN.errorsWrapper, parent: inputsContainer });
  createInputField('email', 'Enter your email*', emailInputWrapper, (value) => { console.log(`email: ${value}`)});
  const emailInputError = createDiv({ parent: emailInputWrapper });
  createErrorMessage('Server error', emailInputError, true); //TODO: test server error; remove it when the actual code will be ready

  const passwordInputWrapper = createDiv({classes: LOGIN.errorsWrapper, parent: inputsContainer});
  createInputField('password', 'Enter your password*', passwordInputWrapper, (value) => { console.log(`password: ${value}`)});
  const passwordInputError = createDiv({ parent: passwordInputWrapper });
  createErrorMessage('Password is too long', passwordInputError, false); //TODO: test validation error; remove it when the actual code will be ready

  const togglePassWrap = createDiv({ classes: LOGIN.passwordVisibility, parent: inputsContainer});
  createInput({ attributes: {id: 'password', type: 'checkbox' }, parent: togglePassWrap, });
  createLabel({ attributes: { for: 'password' }, parent: togglePassWrap, text: 'Show password' });

  createFunctionalityButton('button', 'Login', inputsContainer, () => console.log('clicked: redirecting to Login page'))

  createA({ classes: LOGIN.link, events: { click: () => console.log('clicked: redirecting to Register page')}, parent: wrapper, text: "Don't have an account? Register" });

  return container;
}