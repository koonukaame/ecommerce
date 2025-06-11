import { createDiv, createImg } from '../../../utils/create-elements/create-tags';
import { IMG_PLACEHOLDER, NAME_PLACEHOLDER } from '../../../shared/constants';
import { createQuantityComponent } from './quantity';
import { createPrice } from './price';
import { ITEM } from '../../../pages/cart/constants';
import type { LineItem } from '@commercetools/platform-sdk';
import { removeProductButton } from '../../../shared/components/remove-from-cart-button';

export async function createCartItem(item: LineItem, wrapper: HTMLDivElement): Promise<HTMLDivElement> {
  const name = item.name?.en || NAME_PLACEHOLDER;
  const imageUrl = item.variant.images?.[0]?.url || IMG_PLACEHOLDER;
  const price = item.price.value.centAmount;
  const discount = item.price.discounted?.value.centAmount;
  const quantity = item.quantity;

  const image = createImg({
    classes: ITEM.image,
    attributes: { src: imageUrl, alt: name },
  });

  const productName = createDiv({
    text: name,
    classes: ITEM.name,
  });

  const nameImageWrapper = createDiv({
    children: [image, productName],
    classes: ITEM.nameImageWrapper,
  });

  const quantityComponent = createQuantityComponent(quantity);
  const priceComponent = createPrice(price, discount, quantity);

  const quantityPriceWrapper = createDiv({
    children: [quantityComponent, priceComponent],
    classes: ITEM.quantityPriceWrapper,
  });

  const removeButton = removeProductButton({ 'data-id': item.productId }, true);

  const quantityPriceButtonWrapper = createDiv({
    children: [quantityPriceWrapper, removeButton],
    classes: ITEM.quantityPriceButtonWrapper,
  });

  const cartItem = createDiv({
    parent: wrapper,
    classes: ITEM.wrapper,
    children: [nameImageWrapper, quantityPriceButtonWrapper],
  });

  return cartItem;
}
