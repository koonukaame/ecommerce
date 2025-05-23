export const CARD = {
  layout: [
    'w-[280px]',
    'border',
    'border-[#252525]/50',
    'h-[630px]',
    'overflow-hidden',
    'transition-transform',
    'flex',
    'flex-col',
    'bg-white',
    'duration-300',
    'hover:shadow-md',
    'hover:scale-105',
    'cursor-pointer',
    'z-10',
  ],
  imgWrapper: ['w-full', 'h-full', 'overflow-hidden'],
  img: ['w-full', 'h-full', 'object-cover', 'transition-transform', 'hover:scale-105', 'duration-300'],
  title: ['text-[14px]', 'text-[#252525]', 'font-bold', 'px-3', 'pt-3'],
  priceWrapper: ['flex', 'gap-2', 'px-3', 'items-center'],
  price: ['text-[16px]', 'text-[#252525]', 'font-semibold'],
  description: ['text-[14px]', 'text-[#252525]', 'px-3', 'pb-3', 'line-clamp-2'],

  discount: ['text-[16px]', 'text-red-600', 'font-bold'],
};

export const CATALOG = {
  cards: ['flex', 'flex-wrap', 'gap-6', 'justify-center', 'px-4', 'py-6', 'relative'],
};
