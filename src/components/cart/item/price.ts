import { createDiv } from '../../../utils/create-elements/create-tags';
import { CENTS_IN_DOLLAR } from '../../../shared/constants';
import { createPriceContainer } from '../../../shared/components/price';

export function createPrice(price: number, discount: number | undefined, quantity: number): HTMLDivElement {
  const priceComponent = createPriceContainer(Number(discount), Number(price), true);

  const priceDiv = createDiv({
    children: [priceComponent],
  });

  const unitPrice = discount ?? price;
  const totalPriceText = createDiv({
    classes: ['text-[12px]', 'sm:text-[16px]', 'text-black', 'font-medium', 'pl-3', 'pr-3'],
    text: `Total: ${(unitPrice * quantity) / CENTS_IN_DOLLAR} $`,
  });

  const wrapper = createDiv({
    classes: ['flex', 'flex-col', 'justify-center', 'items-center', 'sm:justify-start', 'sm:items-start', 'w-[160px]'],
    children: [priceDiv, totalPriceText],
  });

  return wrapper;
}
