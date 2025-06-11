import type { ProductProjection } from '@commercetools/platform-sdk';

import { createDiv, createImg, createSpan } from '../../../utils/create-elements/create-tags';
import { CARD } from '../../../pages/catalog/constants';
import { discountMark } from './discount-mark';
import { createPriceContainer } from '../../../shared/components/price';
import { Page } from '../../../app/constants';
import { changePath } from '../../../app/router/handlers';
import { addProductButton } from '../../../shared/components/add-to-cart-button';

export function createProductCard(product: ProductProjection, existInCart: boolean): HTMLDivElement {
  const productDescription = product.description?.en || 'Just a cool product for you!';
  const productName = product.name.en;
  const productSlug = product.slug.en;
  const productID = product.id;
  const productPic =
    product.masterVariant.images?.[0].url ||
    'https://placehold.co/1000x1500/F5F5F5/png?text=Oops,+something+went+wrong!';
  const pricesObject = product.masterVariant.prices?.[0];
  const productPrice = pricesObject?.value.centAmount || 0;
  const productDiscount = pricesObject?.discounted?.value.centAmount || 0;

  const imageWrapper = createDiv({ classes: CARD.imgWrapper });
  createImg({
    classes: [...CARD.img, ...CARD.imgHover],
    attributes: { src: productPic, alt: productDescription },
    parent: imageWrapper,
  });

  discountMark(imageWrapper, productPrice, productDiscount);

  const name = createSpan({ text: productName, classes: CARD.title });

  const description = createSpan({ text: productDescription, classes: CARD.description });

  const priceWrapper = createPriceContainer(productDiscount, productPrice);

  const basketButton = existInCart
    ? addProductButton({ 'data-id': productID, disabled: '' })
    : addProductButton({ 'data-id': productID });

  const card = createDiv({
    classes: [...CARD.layout, ...CARD.layoutHover],
    children: [imageWrapper, name, description, priceWrapper, basketButton],
    events: {
      click: (event) => {
        if (!(event.target instanceof HTMLButtonElement)) {
          changePath(Page.product, productSlug)();
        }
      },
    },
  });

  return card;
}
