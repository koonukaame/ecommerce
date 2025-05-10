import { registrationForm } from "../../components/registration/registration";
import { container } from "../../shared/components/form-input-container";

export function RegistrationPage(): HTMLElement {
  registrationForm(container);

  return container;
}
