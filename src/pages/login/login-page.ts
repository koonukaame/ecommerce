import { createInputField } from "../../shared/components/input";
import { BUTTON, LOGIN } from "../../shared/styles";
import { createA, createButton, createDiv, createForm, createH1, createInput, createLabel, createMain } from "../../utils/create-elements/create-tags";

export function LoginPage(): HTMLElement {
  const container = createMain({ classes: LOGIN.container, parent: document.body});
  const wrapper = createDiv({ classes: LOGIN.wrapper, parent: container });

  createH1({classes: LOGIN.header1, parent: wrapper, text: 'Registration'});

  const inputsContainer = createForm({ classes: LOGIN.inputContainer, parent: wrapper });

  createInputField('email', 'Enter your email*', inputsContainer, (value) => { console.log(`email: ${value}`)});
  createInputField('password', 'Enter your password*', inputsContainer, (value) => { console.log(`password: ${value}`)});

  const togglePassWrap = createDiv({ classes: LOGIN.passwordVisibility, parent: inputsContainer});
  createInput({ attributes: {id: 'password', type: 'checkbox' }, parent: togglePassWrap, });
  createLabel({ attributes: { for: 'password' }, parent: togglePassWrap, text: 'Show password' });

  createButton({
    attributes: { type: 'button' }, //! Was added to prevent redirecting; consider removing it when validation will be done
    classes: [...BUTTON.general, ...BUTTON.generalHover, ...BUTTON.generalFocus],
    events: { click: () => console.log('clicked')},
    parent: inputsContainer,
    text: 'Login',
  })

  createA({ classes: LOGIN.link, events: { click: () => console.log('clicked')}, parent: wrapper, text: "Don't have an account? Register" });

  return container;
}