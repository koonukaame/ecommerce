import { registration } from "../../components/registration/layout";
import { container } from "../../shared/components/form-input-container";

export function RegistrationPage(): HTMLElement {
  const form = registration();

  container.append(form);

  return container;
}
