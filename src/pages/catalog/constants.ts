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
  title: ['text-[14px]', 'text-[#252525]', 'font-bold', 'pt-3', 'pl-3'],
  priceWrapper: ['flex', 'gap-2', 'p-3', 'items-center'],
  price: ['text-[16px]', 'text-[#252525]', 'font-semibold'],
  description: ['text-[14px]', 'text-[#252525]', 'p-3', 'line-clamp-2'],
  discount: ['text-[16px]', 'text-red-600', 'font-bold'],
};

export const SVG = {
  svgPicture: ['w-5', 'h-5', 'transition-[fill]'],
};

export const CATALOG = {
  wrapper: ['flex', 'flex-col', 'w-full', 'items-center', 'gap-[30px]', 'p-3'],
  cardsWrapper: ['flex', 'flex-wrap', 'gap-6', 'justify-center', 'relative'],
  searchWrapper: ['flex', 'gap-2', 'justify-center', 'align-center'],
};
