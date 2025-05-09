import { registrationButton } from "../../shared/components/button";
import { container } from "../../shared/components/form-input-container";
import { registrationLink } from "../../shared/components/link";
import { registrationSelect } from "../../shared/components/select";
import { HEADER2 } from "../../shared/styles";
import { emailInput, passwordInput } from "../../shared/ui-config/credential-inputs";
import { createDiv, createForm, createH2 } from "../../utils/create-elements/create-tags";
import { REGISTRATION } from "./constants";
import { birthDate, city, firstName, lastName, postalCode, street } from "./input";

export function RegistrationPage(): HTMLElement {

  const heading = createH2({classes: HEADER2.general, text: 'Registration' });

  const credentials = createDiv({ children: [emailInput, passwordInput], classes: REGISTRATION.inputsContainer });

  const userData = createDiv({ children: [firstName, lastName, birthDate], classes: REGISTRATION.inputsContainer });

  const country = createDiv({ children: [registrationSelect], classes: REGISTRATION.inputsContainer});

  const address = createDiv({ children: [street, city, postalCode], classes: REGISTRATION.inputsContainer });

  const form = createForm({ children: [credentials, userData, country, address, registrationButton], classes: REGISTRATION.form })
  createDiv({ children: [heading, form, registrationLink], classes: REGISTRATION.wrapper, parent: container });

  return container;
}
