import { createProductCard } from '../components/catalog/card/card';
import { createCatalogErrorMessage } from '../components/catalog/catalog-error-message';

export function handleSearchResults(wrapper: HTMLDivElement, data: unknown): void {
  if (typeof data === 'object' && data !== null && 'results' in data && Array.isArray(data.results)) {
    wrapper.replaceChildren();

    if (data.results.length === 0) {
      createCatalogErrorMessage(wrapper, 'No results found. Try refining or changing your keywords.');
    }

    for (const product of data.results) {
      const card = createProductCard(product);
      wrapper.append(card);
    }
  } else {
    createCatalogErrorMessage(wrapper, 'Something went wrong while processing your search. Please try again');
  }
}
