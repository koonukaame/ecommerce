export const CART = {
  wrapper: ['flex', 'w-full', 'flex-col', 'm-3'],
  itemsWrapper: ['flex', 'flex-col', 'w-full', 'items-center'],
};

export const ITEM = {
  wrapper: ['p-4', 'border-b', 'w-full', 'flex', 'justify-between', 'items-center', 'gap-4'],
  image: ['sm:w-18', 'sm:h-27', 'w-12', 'h-18', 'object-cover', 'rounded-md', 'bg-gray-100'],
  name: ['sm:text-[16px]', 'text-[12px]', 'font-medium', 'max-w-[150px]'],
  nameImageWrapper: ['flex', 'justify-center', 'items-center', 'gap-2'],
  quantityPriceWrapper: ['flex', 'sm:flex-row', 'flex-col', 'justify-center', 'items-center', 'gap-2'],
};

export const PRICE = {
  wrapper: ['flex', 'flex-col', 'justify-center', 'items-center', 'sm:justify-start', 'sm:items-start', 'w-[160px]'],
  totalPrice: ['text-[12px]', 'sm:text-[16px]', 'text-black', 'font-medium', 'pl-3', 'pr-3'],
};

export const QUANTITY = {
  wrapper: ['sm:text-[14px]', 'text-[10px]', 'text-gray-500', 'flex', 'flex-col'],
  controls: ['flex', 'items-center', 'gap-2'],
  controlsBtn: [
    'w-6',
    'h-6',
    'border',
    'rounded',
    'text-sm',
    'cursor-pointer',
    'flex',
    'items-center',
    'justify-center',
  ],
};

export const CART_MESSAGES = {
  emptyCart: 'Your cart is empty. Start shopping and fill it with some amazing items!',
};
