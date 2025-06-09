import type { ProductInfo } from './layout';

import { createDiv, createH2, createH3, createP, createSpan } from '../../utils/create-elements/create-tags';
import { CENTS_IN_DOLLAR, DECIMAL_PLACES } from '../../shared/constants';
import { HEADER2, HEADER3 } from '../../shared/styles';
import { PRODUCT_CLASSES } from '../../pages/product/constants';
import { addProductButton } from '../../shared/components/add-to-cart-button';
import { removeProductButton } from '../../shared/components/remove-from-cart-button';
import { getProductIdsExistInCart } from '../../helpers/get-ids-exist-in-cart';

export async function ProductDescription(productInfo: ProductInfo): Promise<HTMLElement> {
  const name = createH2({
    text: productInfo.name,
    classes: HEADER2.general,
  });
  const price = createH3({
    text: 'Price:',
    classes: [...HEADER3.general, ...HEADER3.productPage],
  });
  const pricesContainer = createDiv({
    classes: PRODUCT_CLASSES.priceSection,
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
  const existInCart = await getProductIdsExistInCart().then((result) => result && result.includes(productInfo.ID));
  const addToCartButton = existInCart
    ? addProductButton({ 'data-id': productInfo.ID, disabled: '' })
    : addProductButton({ 'data-id': productInfo.ID });
  const removeFromCartButton = existInCart
    ? removeProductButton({ 'data-id': productInfo.ID })
    : removeProductButton({ 'data-id': productInfo.ID, disabled: '' });
  addToCartButton.addEventListener('click', () => removeFromCartButton.removeAttribute('disabled'));
  removeFromCartButton.addEventListener('click', () => addToCartButton.removeAttribute('disabled'));
  const title = createH3({
    text: 'Description:',
    classes: [...HEADER3.general, ...HEADER3.productPage],
  });
  const info = createP({
    text: productInfo.description,
    classes: PRODUCT_CLASSES.descriptionText,
  });
  const container = createDiv({
    classes: PRODUCT_CLASSES.container,
    children: [name, price, pricesContainer, addToCartButton, removeFromCartButton, title, info],
  });
  return container;
}
