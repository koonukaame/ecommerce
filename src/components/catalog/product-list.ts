import { createDiv } from '../../utils/create-elements/create-tags';
import { createProductCard } from './card';
import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { CATALOG } from '../../pages/catalog/constants';
import { CustomEventEmitter } from '../../utils/event-emitter';

export const searchEventEmitter = new CustomEventEmitter();

export function createProductList(products: ProductProjectionPagedQueryResponse): HTMLDivElement {
  const wrapper = createDiv({ classes: CATALOG.cardsWrapper });

  for (const product of products.results) {
    const card = createProductCard(product);
    wrapper.append(card);
  }

  searchEventEmitter.subscribe('search', (data) => {
    if (typeof data === 'object' && data !== null && 'results' in data && Array.isArray(data.results)) {
      wrapper.replaceChildren();

      for (const product of data.results) {
        const card = createProductCard(product);
        wrapper.append(card);
      }
    }
  });

  return wrapper;
}
