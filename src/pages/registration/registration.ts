import { registrationLayout } from "../../components/registration/layout";
import { container } from "../../shared/components/container";

export function RegistrationPage(): HTMLElement {
  const layout = registrationLayout();

  container.append(layout);

  return container;
}
