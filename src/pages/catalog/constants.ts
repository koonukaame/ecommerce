export const CARD = {
  layout: [
    'w-[280px]',
    'border',
    'border-[#252525]/50',
    'h-[630px]',
    'overflow-hidden',
    'flex',
    'flex-col',
    'bg-white',
    'cursor-pointer',
    'z-10',
  ],
  layoutHover: ['duration-300', 'hover:scale-105', 'transition-transform'],
  imgWrapper: ['w-full', 'h-full', 'overflow-hidden'],
  img: ['w-full', 'h-full', 'object-cover'],
  imgHover: ['duration-300', 'hover:scale-105', 'transition-transform'],
  title: ['text-[14px]', 'text-[#252525]', 'font-bold', 'px-3', 'pt-3'],
  priceWrapper: ['flex', 'gap-2', 'px-3', 'items-center'],
  price: ['text-[16px]', 'text-[#252525]', 'font-semibold'],
  description: ['text-[14px]', 'text-[#252525]', 'px-3', 'pb-3', 'line-clamp-2'],
  discount: ['text-[16px]', 'text-red-600', 'font-bold'],
};

export const CATALOG = {
  cardsWrapper: ['flex', 'flex-wrap', 'gap-6', 'justify-center', 'px-4', 'p-6', 'relative'],
};
