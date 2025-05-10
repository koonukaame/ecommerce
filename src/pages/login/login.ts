import { loginLayout } from '../../components/login/laylout';
import { container } from '../../shared/components/container';

export function LoginPage(): HTMLElement {
  const layout = loginLayout();

  container.append(layout);

  return container;
}
