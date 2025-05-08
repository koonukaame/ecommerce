import type { Options } from "../../utils/create-elements/types";

import { BUTTON } from "../../shared/styles";

export const LOGIN = {
  container: ['flex', 'justify-center', 'items-center', 'min-h-screen', 'p-3'],
  errorsWrapper: ['w-full', 'max-w-[400px]', 'p-2' ],
  inputContainer: ['flex', 'flex-col', 'w-full', 'items-center', 'gap-2'],
  link: ['cursor-pointer', 'duration-300', 'hover:underline'],
  passwordVisibility: ['w-full', 'max-w-[400px]', 'flex', 'justify-end', 'gap-1'],
  wrapper: ['flex', 'flex-col', 'max-w-[600px]', 'w-full', 'items-center', 'gap-[30px]', 'p-3', 'border', 'border-[#252525]/50'],
}

type Button = Record<'login', ButtonProps>
type ButtonProps = Omit<Options<'button'>, 'children' | 'parent' | 'tag'>;

export const BUTTONS_CONFIG: Button = {
  login: {
    attributes: {
      type: 'button', //TODO: It's here to prevent redirection; remove it when validation will be ready
    },
    classes: [...BUTTON.general, ...BUTTON.generalHover, ...BUTTON.generalFocus],
    events: {
      click: () => console.log('clicked: redirecting to Login page')
    },
    text: 'Login',
  }
}
