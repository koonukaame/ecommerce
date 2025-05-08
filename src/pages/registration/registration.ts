import { createInputField } from "../../shared/components/input";
import { REGISTRATION } from "../../shared/styles";
import { createDiv, createMain } from "../../utils/create-elements/create-tags";

export function RegistrationPage(): void {
  const container = createMain({ classes: REGISTRATION.container, parent: document.body});
  const wrapper = createDiv({ classes: REGISTRATION.wrapper, parent: container });

  const credentialsContainer = createDiv({ classes: REGISTRATION.inputsContainer, parent: wrapper });
  createInputField('email', 'Enter your email', credentialsContainer, (value) => console.log(`email: ${value}`));
  createInputField('password', 'Enter your password', credentialsContainer, (value) => console.log(`password: ${value}`));

  const personalDataContainer = createDiv({ classes: REGISTRATION.inputsContainer, parent: wrapper });
  createInputField('text', 'Enter your first name', personalDataContainer, (value) => console.log(`name: ${value}`));
  createInputField('text', 'Enter your last name', personalDataContainer, (value) => console.log(`surname: ${value}`));
  createInputField('date', 'Enter your date of birth', personalDataContainer, (value) => console.log(`email: ${value}`));

  const addressContainer = createDiv({ classes: REGISTRATION.inputsContainer, parent: wrapper });
  createInputField('text', 'Enter your street', addressContainer, (value) => console.log(`street: ${value}`));
  createInputField('text', 'Enter your city', addressContainer, (value) => console.log(`city: ${value}`));
  createInputField('text', 'Enter your postal code', addressContainer, (value) => console.log(`code: ${value}`));
  
}
