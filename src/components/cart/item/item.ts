import { createDiv, createImg } from '../../../utils/create-elements/create-tags';
import { IMG_PLACEHOLDER } from '../../../shared/constants';
import { getOrCreateCart } from '../../../app/api/get-or-create-cart';
import { createQuantityComponent } from './quantity';
import { createPrice } from './price';

export async function createCartItem(layout: HTMLDivElement): Promise<HTMLDivElement> {
  const wrapper = createDiv({ parent: layout, classes: ['flex', 'flex-col', 'w-full'] });

  const cart = await getOrCreateCart();

  if ('message' in cart) {
    return wrapper;
  }

  for (const item of cart.lineItems) {
    const name = item.name?.en || 'Unnamed product';
    const imageUrl = item.variant.images?.[0]?.url || IMG_PLACEHOLDER;
    const price = item.price.value.centAmount;
    const discount = item.price.discounted?.value.centAmount;
    const quantity = item.quantity;

    const cartItem = createDiv({
      parent: wrapper,
      classes: ['p-4', 'border-b', 'w-full'],
    });

    const image = createImg({
      classes: ['sm:w-18', 'sm:h-27', 'w-12', 'h-18', 'object-cover', 'rounded-md', 'bg-gray-100'],
      attributes: { src: imageUrl, alt: name },
    });

    const productName = createDiv({
      text: name,
      classes: ['sm:text-[16px]', 'text-[12px]', 'font-medium', 'max-w-[150px]'],
    });

    const nameImageWrapper = createDiv({
      children: [image, productName],
      classes: ['flex', 'justify-center', 'items-center', 'gap-2'],
    });

    const quantityComponent = createQuantityComponent(quantity);
    const priceComponent = createPrice(price, discount, quantity);

    const quantityPriceWrapper = createDiv({
      children: [quantityComponent, priceComponent],
      classes: ['flex', 'sm:flex-row', 'flex-col', 'justify-center', 'items-center', 'gap-2'],
    });

    createDiv({
      parent: cartItem,
      classes: ['flex', 'justify-between', 'items-center', 'gap-4', 'w-full', 'cart-item'],
      children: [nameImageWrapper, quantityPriceWrapper],
    });
  }

  return wrapper;
}
