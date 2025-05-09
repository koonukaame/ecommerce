import { HEADER1 } from "../../shared/styles";
import { createDiv, createForm, createH1, createMain } from "../../utils/create-elements/create-tags";
import { REGISTRATION } from "./constants";
import { birthDate, city, emailInput, firstName, lastName, passwordInput, postalCode, street } from "./input";

export function RegistrationPage(): HTMLElement {
  const container = createMain({ classes: REGISTRATION.container, parent: document.body});
  const wrapper = createDiv({ classes: REGISTRATION.wrapper, parent: container });

  createH1({classes: HEADER1.general, parent: wrapper, text: 'Registration' });

  const inputsContainer = createForm({ parent: wrapper })

  createDiv({ children: [emailInput, passwordInput], classes: REGISTRATION.inputsContainer, parent: inputsContainer });

  createDiv({ children: [firstName, lastName, birthDate], classes: REGISTRATION.inputsContainer, parent: inputsContainer });

  createDiv({ children: [street, city, postalCode], classes: REGISTRATION.inputsContainer, parent: inputsContainer });

  return container;
}
