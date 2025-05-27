import {
  createButton,
  createDiv,
  createH2,
  createH3,
  createP,
  createSpan,
} from '../../utils/create-elements/create-tags';
import type { ProductInfo } from './layout';
import { CENTS_IN_DOLLAR, DECIMAL_PLACES } from '../../shared/constants';
import { BUTTONS_CONFIG } from '../../shared/ui-config/button';
import { HEADER2, HEADER3 } from '../../shared/styles';
import { PRODUCT_CLASSES } from '../../pages/product/constants';

export function ProductDescription(productInfo: ProductInfo): HTMLElement {
  const container = createDiv({ classes: PRODUCT_CLASSES.container });

  createH2({
    text: productInfo.name,
    classes: HEADER2.general,
    parent: container,
  });

  createH3({ text: 'Price:', parent: container, classes: [...HEADER3.general, ...HEADER3.productPage] });

  const pricesContainer = createDiv({
    classes: PRODUCT_CLASSES.priceSection,
    parent: container,
  });

  createSpan({
    text: `${(productInfo.price / CENTS_IN_DOLLAR).toFixed(DECIMAL_PLACES)}$`,
    parent: pricesContainer,
    classes: [
      ...(productInfo.discountPrice ? PRODUCT_CLASSES.originalPriceWithDiscount : PRODUCT_CLASSES.originalPrice),
    ],
  });

  if (productInfo.discountPrice) {
    createSpan({
      text: `${(productInfo.discountPrice / CENTS_IN_DOLLAR).toFixed(DECIMAL_PLACES)}$`,
      parent: pricesContainer,
      classes: PRODUCT_CLASSES.discountedPrice,
    });
  }

  const basketButton = createButton(BUTTONS_CONFIG.basket);
  container.append(basketButton);

  createH3({ text: 'Description:', parent: container, classes: [...HEADER3.general, ...HEADER3.productPage] });

  createP({
    text: productInfo.description,
    classes: PRODUCT_CLASSES.descriptionText,
    parent: container,
  });

  return container;
}
