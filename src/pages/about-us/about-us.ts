import { aboutUsLayout } from '../../components/about-us/layout';
import { container } from '../../shared/components/container';

export function AboutUsPage(): HTMLElement {
  const layout = aboutUsLayout();
  container.append(layout);

  return container;
}
