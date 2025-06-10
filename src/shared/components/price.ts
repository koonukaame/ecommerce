import { createDiv, createSpan } from '../../utils/create-elements/create-tags';
import { CARD } from '../../pages/catalog/constants';
import { PRODUCT_CLASSES } from '../../pages/product/constants';
import { formatPrice } from '../../helpers/format-price';

export function createPriceContainer(
  productDiscount: number,
  productPrice: number,
  isCardClasses = true,
): HTMLDivElement {
  const isDiscount = productDiscount > 0;

  const wrapperClasses = isCardClasses ? CARD.priceWrapper : PRODUCT_CLASSES.priceSection;

  const priceClasses = isCardClasses
    ? [...CARD.price, ...(isDiscount ? ['line-through'] : [])]
    : [...(isDiscount ? PRODUCT_CLASSES.originalPriceWithDiscount : PRODUCT_CLASSES.originalPrice)];

  const discountClasses = isCardClasses ? CARD.discount : PRODUCT_CLASSES.discountedPrice;

  const priceWrapper = createDiv({ classes: wrapperClasses });

  createSpan({
    text: formatPrice(productPrice),
    classes: priceClasses,
    parent: priceWrapper,
  });

  if (isDiscount) {
    createSpan({
      text: formatPrice(productDiscount),
      classes: discountClasses,
      parent: priceWrapper,
    });
  }

  return priceWrapper;
}
