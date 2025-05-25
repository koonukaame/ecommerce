export const INPUT = {
  registration: ['h-[50px]', 'border', 'border-[#252525]/50', 'text-[#252525]', 'p-2'],
  search: ['h-[30px]', 'w-[300px]', 'border', 'border-[#252525]/50', 'text-[#252525]', 'p-2'],
};

export const HEADER2 = {
  general: ['text-[20px]'],
};

export const SELECT = {
  general: [
    'flex-1',
    'basis-[calc(50%-8px)]',
    'max-w-[48%]',
    'h-[50px]',
    'border',
    'border-[#252525]/50',
    'text-[#252525]',
  ],
};

export const BUTTON = {
  general: [
    'w-full',
    'max-w-[400px]',
    'h-[50px]',
    'bg-[#E0BEA2]',
    'text-white/100',
    'p-2',
    'duration-500',
    'cursor-pointer',
    'uppercase',
  ],
  generalFocus: [
    'transition-shadow',
    'active:shadow-[inset_0_3px_7px_0_rgba(37,37,37,0.15),0_10px_10px_0_rgba(37,37,37,0.15)]',
  ],
  generalHover: ['transition-shadow', 'hover:shadow-[0_10px_10px_0_rgba(37,37,37,0.15)]', 'duration-500'],
};

export const CONTAINER = {
  general: ['flex', 'justify-center', 'items-center', 'pt-[65px]'],
};

export const LINK = {
  general: ['cursor-pointer', 'duration-300', 'text-black'],
  generalHover: ['hover:text-[#E0BEA2]', 'transition-color', 'duration-300'],
};

export const CHECKBOX = {
  general: ['w-full', 'flex', 'gap-1'],
  login: ['justify-end'],
};

export const ERROR_WRAPPER = {
  general: ['flex-1', 'basis-[calc(50%-8px)]', 'max-w-[48%]', 'flex', 'flex-col'],
};

export const ERROR = {
  general: ['text-red-500', 'flex', 'justify-start', 'items-center', 'gap-1'],
  info: ['text-3xl', 'text-[#252525]/60', 'font-bold', 'w-full', 'flex', 'justify-center'],
};

export const LOGO_CLASSES: string[] = [
  'logo',
  'font-sans',
  'pl-4',
  'mx-auto',
  'my-auto',
  'md:text-6xl',
  'lg:pl-17',
  'cursor-pointer',
  'text-4xl',
  'transition-[color]',
  'uppercase',
  'col-span-2',
];

export const POPUP = {
  error: ['bg-red-700'],
  fadeIn: ['opacity-100', 'translate-y-0'],
  fadeOut: ['opacity-0', '-translate-y-5'],
  general: [
    'fixed',
    'z-[999]',
    'top-5',
    'right-5',
    'p-4',
    'rounded-lg',
    'text-white',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'font-bold',
  ],
  success: ['bg-green-800'],
};
