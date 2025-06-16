import { BUTTON } from '../../shared/styles';

const BASE_BUTTON = [...BUTTON.general, ...BUTTON.generalFocus, ...BUTTON.generalHover];

export const MODAL = {
  wrapper: [
    'fixed',
    'inset-0',
    'bg-black/50',
    'backdrop-blur-sm',
    'z-50',
    'flex',
    'items-center',
    'justify-center',
    'p-4',
    'overflow-hidden',
  ],
  container: [
    'bg-white',
    'shadow-2xl',
    'max-w-md',
    'w-full',
    'transform',
    'transition-all',
    'duration-300',
    'scale-100',
  ],
  content: ['p-8', 'text-center'],
  title: ['text-2xl', 'font-bold', 'text-gray-900', 'mb-4'],
  message: ['text-gray-700', 'mb-6'],
  buttonsContainer: ['flex', 'gap-4'],
  closeModalButton: ['!text-gray-700', 'border-1', 'border-gray-300', 'bg-white', ...BASE_BUTTON],
  clearCartButton: BASE_BUTTON,
  openModalButton: ['mt-[10px]', 'mb-[10px]', 'self-start', '!w-[200px]', '!h-[34px]', 'text-[12px]', ...BASE_BUTTON],
};

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
  quantityPriceButtonWrapper: ['flex', 'sm:flex-row', 'flex-col', 'justify-center', 'items-center', 'gap-2'],
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

export const PROMOCODE = {
  wrapper: ['flex', 'flex-col', 'gap-2', 'mt-4'],
  applyPromocodeButton: ['text-[12px]', 'h-auto', 'w-[200px]'],
};

export const TOTAL_PRICE = {
  priceBeforePromocode: ['text-xl'],
  originalPrice: ['line-through', 'text-[#252525]'],
  discountedPrice: ['text-red-600/90', 'pl-1'],
};

export const CART_MESSAGES = {
  emptyCart: 'Your cart is empty. Start shopping and fill it with some amazing items!',
};
