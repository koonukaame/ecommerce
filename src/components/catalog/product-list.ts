import { createDiv } from '../../utils/create-elements/create-tags';
import { createProductCard } from './card/card';
import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { CATALOG } from '../../pages/catalog/constants';
import { CustomEventEmitter } from '../../utils/event-emitter';
import { handleSearchResults } from '../../helpers/handle-search-results';

export const searchEventEmitter = new CustomEventEmitter();

export function createProductList(products: ProductProjectionPagedQueryResponse): HTMLDivElement {
  const wrapper = createDiv({ classes: CATALOG.cardsWrapper });

  for (const product of products.results) {
    const card = createProductCard(product);
    wrapper.append(card);
  }

  searchEventEmitter.subscribe('search', (data) => handleSearchResults(wrapper, data));

  return wrapper;
}
