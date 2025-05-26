import { createProductCard } from '../components/catalog/card/card';
import { createInfoMessage } from '../shared/components/info-message';

export function renderProductResults(
  wrapper: HTMLDivElement,
  data: unknown,
  noResultsMessage: string,
  errorMessage: string,
): void {
  if (typeof data === 'object' && data !== null && 'results' in data && Array.isArray(data.results)) {
    wrapper.replaceChildren();

    if (data.results.length === 0) {
      createInfoMessage(wrapper, errorMessage);
    }

    for (const product of data.results) {
      const card = createProductCard(product);
      wrapper.append(card);
    }
  } else {
    createInfoMessage(wrapper, noResultsMessage);
  }
}
