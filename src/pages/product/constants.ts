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

export const PRODUCT_CLASSES = {
  container: ['w-[100vw]', 'md:w-[50vw]', 'p-4', 'mx-4'],
  priceSection: ['flex', 'items-end', 'mb-5'],
  originalPrice: ['text-2xl'],
  originalPriceWithDiscount: ['line-through', 'text-zinc-400', 'text-lg'],
  discountedPrice: ['mx-4', 'text-red-500', 'text-2xl'],
  descriptionText: ['max-w-[400px]', 'text-base'],
};

export const SLIDER_CLASSES = {
  containerSlider: ['max-w-[100%]', 'md:max-w-[50%]', 'slider'],
  wrapper: ['swiper-wrapper', 'select-none'],
  imageContainer: ['p-3', 'cursor-pointer', 'swiper-slide', 'text-center'],
  image: ['h-auto', 'max-w-[100%]'],
};

export const MODAL_CLASSES = {
  overlay: ['fixed', 'inset-0', 'bg-black/80', 'z-50', 'flex', 'justify-center', 'items-center'],
  content: ['relative', 'max-w-[75vw]', 'w-full', 'relative', 'flex', 'justify-center', 'items-center', 'select-none'],
  imageContainer: [
    'swiper-slide',
    'flex',
    'justify-center',
    'items-center',
    'max-h-[100vh]',
    'w-[80vw]',
    'max-w-[800px]',
  ],
  image: ['max-h-[98vh]', 'w-auto'],
  closeButton: ['absolute', 'top-2', 'right-6', 'text-white', 'text-5xl', 'cursor-pointer', 'z-[99]'],
  pagination: ['swiper-pagination', 'z-70'],
};
