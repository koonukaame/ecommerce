import { createButtonWithSVG } from '../../utils/create-elements/create-svg-buttom';
import { 
  createButton,
  createH1, 
 } from '../../utils/create-elements/create-tags';

const HEADER_CLASSES: {[key: string]: string[]} = {
  header: ["h-16", "grid", "gap-0", "px-2", "md:px-8", "grid-cols-3", "grid-flow-col", "md:grid-cols-[max-content_1fr_2fr_max-content_0.5fr]", "text-xl", "md:text-2xl"],
  leftMenu: ["text-left", "gap-7", "items-center", "hidden", "md:flex"],
  logo: ["logo", "font-sans", "pl-4", "xs:pl-10", "mx-auto", "md:text-6xl", "cursor-pointer", "text-4xl", "transition-[color]", "uppercase", "col-span-2"],
  menuItem: ["cursor-pointer", "text-black", "transition-[color]", "header-hovered", "uppercase"],
  rightMenu: ["flex", "items-center", "justify-start", "md:justify-center", "gap-2", "order-first", "md:order-none", "md:gap-4", "md:items-left", "whitespace-nowrap"],
  svgButtonBasket: ["cursor-pointer"],
  svgButtonPerson: ["cursor-pointer", "logined"],
  svgDiv: ["flex", "items-center", "justify-center", "gap-2", "md:gap-4"],
  svgPicture: ["w-12", "h-8", "bg-no-repeat", "bg-center", "transition-[fill]", "header-hovered", "md:h-9"],
};

const aboutButton = createButton({ 
  classes: HEADER_CLASSES.menuItem,
  events: {click: () => {
    console.log('Go to Page About Us')
  }},
  text: 'About Us' 
});

const logo = createH1({
  classes: HEADER_CLASSES.logo,
  events: {click: () => {
    console.log('Go to Main page');
  }},
  text: 'yanki',
});
const loginButton = createButton({ classes: [...HEADER_CLASSES.menuItem, "not-logined"],
  events: {click: () => {
    console.log('Go to Login Page');
  }},
  text: 'log in',
});

const registrationButton = createButton({ 
  classes: [...HEADER_CLASSES.menuItem, "not-logined"],
  events: {click: () => {
    console.log('Go to Registration Page')
  }},
  text: 'Sign up',
});

const logoutButton = createButton({ classes: [...HEADER_CLASSES.menuItem, "logined"],
  events: {click: () => {
    console.log('Go to Main Page & Log Out');
  }},
  text: 'log out',
});

const buttonPerson = createButtonWithSVG(
  HEADER_CLASSES.svgButtonPerson, 
  HEADER_CLASSES.svgPicture,
  '/svg/sprite.svg#person'
);

const buttonBasket = createButtonWithSVG(
  HEADER_CLASSES.svgButtonBasket, 
  HEADER_CLASSES.svgPicture, 
  '/svg/sprite.svg#basket',
);

const calalogButton = createButton({ 
  classes: HEADER_CLASSES.menuItem, 
  events: {click: () => {
    console.log('Go to Page Catalog');
  }},
  text: 'Catalog',
});

export { aboutButton, buttonBasket, buttonPerson, calalogButton, HEADER_CLASSES, loginButton, logo, logoutButton, registrationButton };