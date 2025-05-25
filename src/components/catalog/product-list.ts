import { createDiv } from '../../utils/create-elements/create-tags';
import { createProductCard } from './card/card';
import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { CATALOG, ERROR_MESSAGES } from '../../pages/catalog/constants';
import { CustomEventEmitter } from '../../utils/event-emitter';
import { renderProductResults } from '../../helpers/render-product-results';

export const searchEventEmitter = new CustomEventEmitter();
export const sortEventEmitter = new CustomEventEmitter();

export function createProductList(products: ProductProjectionPagedQueryResponse): HTMLDivElement {
  const wrapper = createDiv({ classes: CATALOG.cardsWrapper });

  for (const product of products.results) {
    const card = createProductCard(product);
    wrapper.append(card);
  }

  searchEventEmitter.subscribe('search', (data) =>
    renderProductResults(wrapper, data, ERROR_MESSAGES.search.noResults, ERROR_MESSAGES.search.error),
  );

  sortEventEmitter.subscribe('sort', (data) =>
    renderProductResults(wrapper, data, ERROR_MESSAGES.sort.noResults, ERROR_MESSAGES.sort.error),
  );

  return wrapper;
}
