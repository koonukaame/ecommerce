import { createButton, createDiv, createImg, createSpan } from '../../utils/create-elements/create-tags';
import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { CARD, CATALOG } from '../../pages/catalog/constants';
import { BUTTONS_CONFIG } from '../../shared/ui-config/button';
import { CENTS_IN_DOLLAR } from '../../shared/constants';

export function createProductCard(response: ProductProjectionPagedQueryResponse): HTMLDivElement {
  const card = createDiv({ classes: CATALOG.cardsWrapper });

  for (const product of response.results) {
    const productDescription = product.description?.en || 'Just a cool product for you!';
    const productName = product.name.en;
    const productPic =
      product.masterVariant.images?.[0].url ||
      'https://placehold.co/1000x1500/F5F5F5/png?text=Oops,+something+went+wrong!';
    const pricesObject = product.masterVariant.prices?.[0];
    const productPrice = pricesObject?.value.centAmount || 0;
    const productDiscount = pricesObject?.discounted?.value.centAmount || 0;

    const isDiscount = productDiscount > 0;

    const imageWrapper = createDiv({ classes: CARD.imgWrapper });
    createImg({
      classes: [...CARD.img, ...CARD.imgHover],
      attributes: { src: productPic, alt: productDescription },
      parent: imageWrapper,
    });

    const name = createSpan({ text: productName, classes: CARD.title });
    const description = createSpan({ text: productDescription, classes: CARD.description });

    const price = createSpan({
      text: `${productPrice / CENTS_IN_DOLLAR} $`,
      classes: [...CARD.price, ...(isDiscount ? ['line-through'] : [])],
    });
    const discount = isDiscount
      ? createSpan({ text: `${productDiscount / CENTS_IN_DOLLAR} $`, classes: CARD.discount })
      : undefined;

    const priceChildren = [price];
    if (discount) {
      priceChildren.push(discount);
    }
    const priceWrapper = createDiv({ classes: CARD.priceWrapper, children: priceChildren });

    const basketButton = createButton(BUTTONS_CONFIG.basket);

    createDiv({
      classes: [...CARD.layout, ...CARD.layoutHover],
      parent: card,
      children: [imageWrapper, name, description, priceWrapper, basketButton],
    });
  }
  return card;
}
