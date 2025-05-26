import { container } from '../../shared/components/container';
import { productLayout } from '../../components/product/layout';
import { getProductById } from '../../app/api/get-product-by-id';
import { isFetchError } from '../../app/api/is-fetch-error';
import { changePath } from '../../app/router/handlers';
import { Page } from '../../app/constants';

export async function ProductPage(slug = 'silver-fox-fur-coat'): Promise<HTMLElement | void> {
  const data = await getProductById(slug);

  if (isFetchError(data) || data.count === 0) {
    changePath(Page.error)();
    return;
  }
  const layout = productLayout(data);

  container.append(layout);

  return container;
}
