import { catalogLayout } from '../../components/catalog/layout';
import { container } from '../../shared/components/container';

export async function CatalogPage(): Promise<HTMLElement> {
  const layout = await catalogLayout();
  container.append(layout);
  return container;
}
