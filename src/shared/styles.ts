export const HEADER1 = {
  general: ['text-[20px]'],
}

export const ERROR = {
  general: ['text-red-500', 'flex', 'justify-start', 'items-center', 'gap-1'],
  icon: ['w-4', 'h-4', 'mt-0.5', 'bg-no-repeat', 'bg-contain'],
}

export const INPUT = {
  general: ['w-full', 'max-w-[400px]', 'h-[50px]', 'border', 'border-[#252525]/50', 'text-[#252525]', 'p-2' ],
}

export const BUTTON = {
  general: ['w-full', 'max-w-[400px]', 'h-[50px]', 'bg-[#E0BEA2]', 'text-white/100', 'p-2', 'duration-500', 'cursor-pointer'],
  generalFocus: ['transition-shadow', 'active:shadow-[inset_0_3px_7px_0_rgba(37,37,37,0.15),0_10px_10px_0_rgba(37,37,37,0.15)]'],
  generalHover: ['transition-shadow', 'hover:shadow-[0_10px_10px_0_rgba(37,37,37,0.15)]', 'duration-500']
}