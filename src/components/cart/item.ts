// /* eslint-disable max-lines-per-function */
import { createDiv, createImg, createButton, createSpan } from '../../utils/create-elements/create-tags';
import { CENTS_IN_DOLLAR } from '../../shared/constants';
import { createPriceComponent } from '../catalog/card/price';

type Item = {
  name: string;
  pic: string;
  price: {
    price: number;
    discount?: number;
  };
  quantity: number;
};

const items: Item[] = [
  {
    name: 'Textured down jacket', // possibly 'product.name.en'
    pic: 'https://placehold.co/1000x1500/F5F5F5/png?text=Oops,+something+went+wrong!', // possibly product.masterVariant.images?.[0].url
    price: {
      price: 32_000, // product.masterVariant.prices?.[0].value.centAmount
      discount: 20_000, // product.masterVariant.prices?.[0].discounted?.value.centAmount
    },
    quantity: 2,
  },
  {
    name: 'Fur coat',
    pic: 'https://placehold.co/1000x1500/F5F5F5/png?text=Oops,+something+went+wrong!',
    price: {
      price: 50_000,
      discount: undefined,
    },
    quantity: 1,
  },
];
export function createCartItem(layout: HTMLDivElement): HTMLDivElement {
  const wrapper = createDiv({ parent: layout, classes: ['flex', 'flex-col', 'w-full'] });

  for (const item of items) {
    const cartItem = createDiv({
      parent: wrapper,
      classes: ['p-4', 'border-b', 'w-full'],
    });

    const image = createImg({
      classes: ['w-12', 'h-18', 'object-cover', 'rounded-md', 'bg-gray-100'],
      attributes: { src: item.pic, alt: item.name },
    });

    const name = createDiv({
      text: item.name,
      classes: ['text-md', 'font-medium', 'max-w-[150px]'],
    });

    const quantityComponent = createQuantityComponent(item);
    const priceComponent = createPrice(item);

    createDiv({
      parent: cartItem,
      classes: ['grid', 'grid-cols-[48px_1fr_auto_auto]', 'items-center', 'gap-4', 'w-full'],
      children: [image, name, quantityComponent, priceComponent],
    });
  }

  return wrapper;
}

function createQuantityComponent(item: Item): HTMLDivElement {
  const quantityWrapper = createDiv({
    classes: ['mt-1', 'text-sm', 'text-gray-500'],
    text: 'Amount: ',
  });

  const controls = createDiv({
    parent: quantityWrapper,
    classes: ['inline-flex', 'items-center', 'gap-2'],
  });

  createButton({
    parent: controls,
    classes: ['px-2', 'py-1', 'border', 'rounded', 'text-sm', 'cursor-pointer'],
    text: '-',
  });

  createSpan({
    parent: controls,
    text: item.quantity.toString(),
  });

  createButton({
    parent: controls,
    classes: ['px-2', 'py-1', 'border', 'rounded', 'text-sm', 'cursor-pointer'],
    text: '+',
  });

  return quantityWrapper;
}

function calculateTotalPrice(item: Item): string {
  const unitPrice = item.price.discount ?? item.price.price;
  const total = `Total: ${(unitPrice * item.quantity) / CENTS_IN_DOLLAR} $`;

  return total;
}

function createPrice(item: Item): HTMLDivElement {
  const priceComponent = createPriceComponent(Number(item.price.discount), Number(item.price.price));

  const price = createDiv({
    classes: ['mt-2'],
    children: priceComponent,
  });

  const totalPriceText = createDiv({
    classes: ['mt-1', 'text-sm', 'text-black', 'font-medium'],
    text: calculateTotalPrice(item),
  });

  const wrapper = createDiv({
    classes: ['flex', 'flex-col', 'justify-between'],
    children: [price, totalPriceText],
  });

  return wrapper;
}
