import { AboutUsLayout } from '../../components/about-us/layout';
import { container } from '../../shared/components/container';

export function AboutUsPage(): HTMLElement {
  const layout = AboutUsLayout();
  container.append(layout);

  return container;
}
