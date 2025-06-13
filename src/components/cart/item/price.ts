import { createDiv } from '../../../utils/create-elements/create-tags';
import { CENTS_IN_DOLLAR } from '../../../shared/constants';
import { createPriceContainer } from '../../../shared/components/price';
import { PRICE } from '../../../pages/cart/constants';

export function createPrice(price: number, discount: number | undefined, quantity: number): HTMLDivElement {
  const priceComponent = createPriceContainer(Number(discount), Number(price), true);

  const unitPrice = discount ?? price;

  const totalPrice = createDiv({
    classes: PRICE.totalPrice,
    text: `Total: ${(unitPrice * quantity) / CENTS_IN_DOLLAR} $`,
  });

  createDiv({
    classes: PRICE.wrapper,
    children: [priceComponent, totalPrice],
  });

  return totalPrice;
}
