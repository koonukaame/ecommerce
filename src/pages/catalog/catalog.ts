import { catalogLayout } from '../../components/catalog/layout';
import { container } from '../../shared/components/container';

export function CatalogPage(): HTMLElement {
  const layout = catalogLayout();

  container.append(layout);

  return container;
}
