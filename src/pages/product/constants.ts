export const DECIMAL_PLACES = 2;

export const LAYOUT_CLASSES = ['w-full', 'flex', 'flex-col', 'items-center'];

export const PRODUCT_CONTAINER_CLASSES = [
  'max-w-[1200px]',
  'flex',
  'flex-col',
  'md:flex-row',
  'md:px-5',
  'ml-0',
  'w-full',
];

export const DISCOUNT_PRICES_CLASSES = ['line-through', 'text-zinc-400', 'text-lg'];

export const SLIDER_CLASSES = {
  imageContainer: ['p-3', 'cursor-pointer', 'swiper-slide', 'text-center'],
  image: ['h-auto', 'max-w-[100%]'],
};

export const MODAL_CLASSES = {
  overlay: ['fixed', 'inset-0', 'bg-black/80', 'z-50', 'flex', 'justify-center', 'items-center'],
  content: ['relative', 'w-[90%]', 'max-w-4xl'],
  imageContainer: ['swiper-slide', 'flex', 'justify-center', 'items-center', 'max-h-[100vh]', 'w-auto'],
  image: ['max-h-[98vh]', 'w-auto'],
  closeButton: ['absolute', 'top-2', 'right-6', 'text-white', 'text-5xl', 'cursor-pointer', 'z-[99]'],
};
