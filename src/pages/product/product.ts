import { container } from '../../shared/components/container';
import { productLayout } from '../../components/product/layout';

export async function ProductPage(): Promise<HTMLElement | void> {
  const layout = await productLayout();

  if (layout) {
    container.append(layout);
    return container;
  }
}
