export const INPUT = {
  general: ['w-full', 'max-w-[400px]', 'h-[50px]', 'border', 'border-[#252525]/50', 'text-[#252525]', 'p-2' ],
}

export const HEADER2 = {
  general: ['text-[20px]'],
}

export const SELECT = {
  general: ['w-full', 'h-[50px]', 'border', 'border-[#252525]/50', 'text-[#252525]', 'p-2' ],
}

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

export const FORM_INPUT = {
  container: ['flex', 'justify-center', 'items-center', 'min-h-screen', 'p-3'],
}

export const LINK = {
  general: ['cursor-pointer', 'duration-300', 'text-black'],
  generalHover: ['hover:text-[#E0BEA2]', 'transition-color', 'duration-300'],
};