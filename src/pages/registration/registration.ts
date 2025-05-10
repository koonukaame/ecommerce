import { registration } from "../../components/registration/layout";
import { container } from "../../shared/components/container";

export function RegistrationPage(): HTMLElement {
  const form = registration();

  container.append(form);

  return container;
}
