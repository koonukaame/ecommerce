import { createProductCard } from '../components/catalog/card/card';
import { createInfoMessage } from '../shared/components/info-message';
import { getProductIdsExistInCart } from './get-ids-exist-in-cart';

export async function renderProductResults(
  wrapper: HTMLDivElement,
  data: unknown,
  noResultsMessage: string,
  errorMessage: string,
): Promise<void> {
  if (typeof data === 'object' && data !== null && 'results' in data && Array.isArray(data.results)) {
    wrapper.replaceChildren();

    if (data.results.length === 0) {
      createInfoMessage(wrapper, noResultsMessage);
    }

    const productsInBasket = await getProductIdsExistInCart();

    for (const product of data.results) {
      const card = createProductCard(product, (productsInBasket && productsInBasket.includes(product.id)) || false);
      wrapper.append(card);
    }
  } else {
    createInfoMessage(wrapper, errorMessage);
  }
}
