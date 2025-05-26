import {
  createButton,
  createDiv,
  createH2,
  createH3,
  createP,
  createSpan,
} from '../../utils/create-elements/create-tags';
import type { ProductInfo } from './layout';
import { CENTS_IN_DOLLAR } from '../../shared/constants';
import { BUTTONS_CONFIG } from '../../shared/ui-config/button';
import { HEADER2, HEADER3 } from '../../shared/styles';
import { DECIMAL_PLACES, DISCOUNT_PRICES_CLASSES } from '../../pages/product/constants';

export function ProductDescription(productInfo: ProductInfo): HTMLElement {
  const container = createDiv({ classes: ['w-[100vw]', 'md:w-[50vw]', 'p-4', 'mx-4'] });

  createH2({
    text: productInfo.name,
    classes: HEADER2.general,
    parent: container,
  });

  createH3({ text: 'Price:', parent: container, classes: [...HEADER3.general, ...HEADER3.productPage] });

  const pricesContainer = createDiv({
    classes: ['flex', 'items-end', 'mb-5'],
    parent: container,
  });

  createSpan({
    text: `${(productInfo.price / CENTS_IN_DOLLAR).toFixed(DECIMAL_PLACES)}$`,
    parent: pricesContainer,
    classes: [...(productInfo.discountPrice ? DISCOUNT_PRICES_CLASSES : ['text-2xl'])],
  });

  if (productInfo.discountPrice) {
    createSpan({
      text: `${(productInfo.discountPrice / CENTS_IN_DOLLAR).toFixed(DECIMAL_PLACES)}$`,
      parent: pricesContainer,
      classes: ['mx-4', 'text-red-500', 'text-2xl'],
    });
  }

  const basketButton = createButton(BUTTONS_CONFIG.basket);
  container.append(basketButton);

  createH3({ text: 'Description:', parent: container, classes: [...HEADER3.general, ...HEADER3.productPage] });

  createP({
    text: productInfo.description,
    classes: ['max-w-[400px]', 'text-base'],
    parent: container,
  });

  return container;
}
