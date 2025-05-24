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
  imgWrapper: ['w-full', 'h-full', 'overflow-hidden'],
  img: ['w-full', 'h-full', 'object-cover'],
  imgHover: ['duration-300', 'hover:scale-105', 'transition-transform'],
  title: ['text-[14px]', 'text-[#252525]', 'font-bold', 'pt-3', 'pl-3'],
  priceWrapper: ['flex', 'gap-2', 'p-3', 'items-center'],
  price: ['text-[16px]', 'text-[#252525]', 'font-semibold'],
  description: ['text-[14px]', 'text-[#252525]/80', 'p-3', 'line-clamp-2'],
  discount: ['text-[16px]', 'text-red-600/90', 'font-bold'],
};

export const IMG = {
  imgWrapper: ['flex', 'items-center', 'justify-center'],
  glass: ['w-5', 'h-5'],
};

export const CATALOG = {
  wrapper: ['flex', 'flex-col', 'w-full', 'items-center', 'gap-[30px]', 'p-3'],
  cardsWrapper: ['flex', 'flex-wrap', 'gap-6', 'justify-center', 'relative'],
  searchWrapper: ['flex', 'gap-2', 'justify-center', 'align-center'],
};
