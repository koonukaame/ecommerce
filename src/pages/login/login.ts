import { loginLayout } from '../../components/login/layout';
import { container } from '../../shared/components/container';

export function LoginPage(): HTMLElement {
  const layout = loginLayout();

  container.append(layout);

  return container;
}
