import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { createDiv } from '../../utils/create-elements/create-tags';
import { createProductCard } from './card/card';
import { CATALOG } from '../../pages/catalog/constants';
import { getProductIdsExistInCart } from '../../helpers/get-ids-exist-in-cart';

export async function createProductList(products: ProductProjectionPagedQueryResponse): Promise<HTMLDivElement> {
  const wrapper = createDiv({ classes: CATALOG.cardsWrapper });

  const productsInBasket = await getProductIdsExistInCart();

  for (const product of products.results) {
    const card = createProductCard(product, (productsInBasket && productsInBasket.includes(product.id)) || false);
    wrapper.append(card);
  }

  return wrapper;
}
