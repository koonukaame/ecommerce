export const LOGIN = {
  container: ['flex', 'justify-center', 'items-center', 'min-h-screen', 'p-3'],
  errorsWrapper: ['w-full', 'max-w-[400px]', 'p-2' ],
  inputContainer: ['flex', 'flex-col', 'w-full', 'items-center', 'gap-2'],
  link: ['cursor-pointer', 'duration-300', 'hover:underline'],
  passwordVisibility: ['w-full', 'max-w-[400px]', 'flex', 'justify-end', 'gap-1'],
  wrapper: ['flex', 'flex-col', 'max-w-[600px]', 'w-full', 'items-center', 'gap-[30px]', 'p-3', 'border', 'border-[#252525]/50'],
}

export const HEADER1 = {
  general: ['text-[20px]'],
}

export const ERROR = {
  general: ['text-red-500', 'flex', 'justify-start', 'items-center', 'gap-1'],
  icon: ['w-4', 'h-4', 'mt-0.5', 'bg-no-repeat', 'bg-contain'],
  server: ['border-red-500'],
}

export const INPUT = {
  general: ['w-full', 'max-w-[400px]', 'h-[50px]', 'border', 'border-[#252525]/50', 'text-[#252525]', 'p-2' ],
}

export const BUTTON = {
  general: ['w-full', 'max-w-[400px]', 'h-[50px]', 'bg-[#E0BEA2]', 'text-white/100', 'p-2', 'duration-500', 'cursor-pointer'],
  generalFocus: ['transition-shadow', 'active:shadow-[inset_0_3px_7px_0_rgba(37,37,37,0.15),0_10px_10px_0_rgba(37,37,37,0.15)]'],
  generalHover: ['transition-shadow', 'hover:shadow-[0_10px_10px_0_rgba(37,37,37,0.15)]', 'duration-500']
}