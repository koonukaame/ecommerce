import { cartLayout } from '../../components/cart/layout';
import { container } from '../../shared/components/container';

export function CartPage(): HTMLElement {
  const layout = cartLayout();
  container.append(layout);

  return container;
}
