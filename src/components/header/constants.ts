import type { Options } from "../../utils/create-elements/types";

export const HEADER_CLASSES: Record<string, string[]> = {
  header: ["h-16", "grid", "gap-0", "px-2", "md:px-8", "grid-cols-3", "grid-flow-col", "md:grid-cols-[max-content_1fr_2fr_max-content_0.5fr]", "text-xl", "md:text-2xl"],
  leftMenu: ["text-left", "gap-7", "items-center", "hidden", "md:flex"],
  menuItem: ["cursor-pointer", "text-black", "transition-[color]", "header-hovered", "uppercase"],
  rightMenu: ["flex", "items-center", "justify-start", "md:justify-center", "gap-2", "order-first", "md:order-none", "md:gap-4", "md:items-left", "whitespace-nowrap"],
  svgButtonBasket: ["cursor-pointer"],
  svgButtonPerson: ["cursor-pointer", "logined"],
  svgDiv: ["flex", "items-center", "justify-center", "gap-2", "md:gap-4"],
  svgPicture: ["w-12", "h-8", "bg-no-repeat", "bg-center", "transition-[fill]", "header-hovered", "md:h-9"],
};

type HeaderButton = Record<'about' | 'calalog' | 'login' | 'logout' | 'registration', HederButtonPropertes>;
type HederButtonPropertes = Pick<Options<keyof HTMLElementTagNameMap>, 'classes' | 'events' | 'text'>;

export const BUTTONS_CONFIG: HeaderButton = {
  about: { 
    classes: HEADER_CLASSES.menuItem,
    events: {click: () => {
      console.log('Go to Page About Us')
    }},
    text: 'About Us' 
  },
  calalog: { 
    classes: HEADER_CLASSES.menuItem, 
    events: {click: () => {
      console.log('Go to Page Catalog');
    }},
    text: 'Catalog',
  },
  login: { 
    classes: [...HEADER_CLASSES.menuItem, "not-logined"],
    events: {click: () => {
      console.log('Go to Login Page');
    }},
    text: 'log in',
  },  
  logout: { 
    classes: [...HEADER_CLASSES.menuItem, "logined"],
    events: {click: () => {
      console.log('Go to Main Page & Log Out');
    }},
    text: 'log out',
  },  
  registration: { 
    classes: [...HEADER_CLASSES.menuItem, "not-logined"],
    events: {click: () => {
      console.log('Go to Registration Page')
    }},
    text: 'Sign up',
  },  
}
