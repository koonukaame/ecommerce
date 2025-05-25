export const CARD = {
  layout: [
    'w-[280px]',
    'border',
    'border-[#252525]/10',
    'rounded-sm',
    'h-[630px]',
    'overflow-hidden',
    'flex',
    'flex-col',
    'bg-white',
    'cursor-pointer',
    'z-10',
  ],
  layoutHover: ['duration-300', 'hover:scale-105', 'transition-transform', 'hover:shadow-lg'],
  imgWrapper: ['w-full', 'h-full', 'overflow-hidden', 'relative'],
  img: ['w-full', 'h-full', 'object-cover'],
  imgHover: ['duration-300', 'hover:scale-105', 'transition-transform'],
  title: ['text-[14px]', 'text-[#252525]', 'font-bold', 'pt-3', 'pl-3'],
  priceWrapper: ['flex', 'gap-2', 'p-3', 'items-center'],
  price: ['text-[16px]', 'text-[#252525]', 'font-semibold'],
  description: ['text-[14px]', 'text-[#252525]/80', 'p-3', 'line-clamp-2'],
  discount: ['text-[16px]', 'text-red-600/90', 'font-bold'],
  discountPercent: [
    'absolute',
    'top-0',
    'left-0',
    'bg-red-600/90',
    'text-white',
    'text-sm',
    'font-bold',
    'p-1',
    'z-20',
  ],
};

export const IMG = {
  imgWrapper: ['flex', 'items-center', 'justify-center'],
  glass: ['w-5', 'h-5'],
};

export const CATALOG = {
  wrapper: ['flex', 'flex-col', 'w-full', 'items-center', 'gap-[30px]', 'p-3', 'm-3'],
  cardsWrapper: ['flex', 'flex-wrap', 'gap-6', 'justify-center', 'relative'],
  searchWrapper: ['flex', 'gap-2', 'justify-center', 'align-center'],
  noResults: ['text-3xl', 'text-[#252525]/60', 'font-bold', 'w-full', 'flex', 'justify-center'],
};
