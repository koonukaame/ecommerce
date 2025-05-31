import { createButton, createDiv, createImg, createSpan } from '../../../utils/create-elements/create-tags';
import { CARD } from '../../../pages/catalog/constants';
import { BUTTONS_CONFIG } from '../../../shared/ui-config/button';
import type { ProductProjection } from '@commercetools/platform-sdk';
import { calculateDiscount } from '../../../helpers/calculate-discount';
import { createPriceComponent } from './price';
import { Page } from '../../../app/constants';
import { changePath } from '../../../app/router/handlers';

export function createProductCard(product: ProductProjection): HTMLDivElement {
  const productDescription = product.description?.en || 'Just a cool product for you!';
  const productName = product.name.en;
  const productSlug = product.slug.en;
  const productPic =
    product.masterVariant.images?.[0].url ||
    'https://placehold.co/1000x1500/F5F5F5/png?text=Oops,+something+went+wrong!';
  const pricesObject = product.masterVariant.prices?.[0];
  const productPrice = pricesObject?.value.centAmount || 0;
  const productDiscount = pricesObject?.discounted?.value.centAmount || 0;

  const discountPercent = calculateDiscount(productPrice, productDiscount);

  const imageWrapper = createDiv({ classes: CARD.imgWrapper });
  createImg({
    classes: [...CARD.img, ...CARD.imgHover],
    attributes: { src: productPic, alt: productDescription },
    parent: imageWrapper,
  });

  if (discountPercent !== undefined) {
    createDiv({
      text: `-${discountPercent}%`,
      classes: CARD.discountPercent,
      parent: imageWrapper,
    });
  }

  const name = createSpan({ text: productName, classes: CARD.title });
  const description = createSpan({ text: productDescription, classes: CARD.description });

  const priceChildren = createPriceComponent(productDiscount, productPrice);

  const priceWrapper = createDiv({ classes: CARD.priceWrapper, children: priceChildren });

  const basketButton = createButton(BUTTONS_CONFIG.basket);

  const card = createDiv({
    classes: [...CARD.layout, ...CARD.layoutHover],
    children: [imageWrapper, name, description, priceWrapper, basketButton],
    events: { click: () => changePath(Page.product, productSlug)() },
  });

  return card;
}
