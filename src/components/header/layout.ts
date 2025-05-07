import './header.css';
import { 
  createButton,
  createDiv,
  createH1, 
  createHeader, 
  createNav,
 } from '../../utils/create-elements/create-tags';

const headerClasses: {[key: string]: string[]} = {
  header: ["h-16", "grid", "gap-0", "px-2", "md:px-8", "grid-cols-3", "grid-flow-col", "md:grid-cols-[max-content_1fr_2fr_max-content_0.5fr]", "text-xl", "md:text-2xl"],
  leftMenu: ["text-left", "gap-7", "items-center", "hidden", "md:flex"],
  logo: ["logo", "font-sans", "pl-4", "xs:pl-10", "md:text-6xl", "uppercase", "mx-auto", "md:text-6xl", "cursor-pointer", "text-4xl", "transition-[color]", "uppercase", "col-span-2"],
  menuItem: ["cursor-pointer", "text-black", "transition-[color]", "header-hovered", "uppercase"],
  rightMenu: ["flex", "items-center", "justify-start", "md:justify-center", "gap-2", "order-first", "md:order-none", "md:gap-4", "md:items-left", "whitespace-nowrap"],
  svgButtonBasket: ["cursor-pointer"],
  svgButtonPerson: ["cursor-pointer", "logined"],
  svgDiv: ["flex", "items-center", "justify-center", "gap-2", "md:gap-4"],
  svgPicture: ["w-12", "h-8", "bg-no-repeat", "bg-center", "transition-[fill]", "header-hovered", "md:h-9"],
};

const createSvgSpread = (classSvg: string[], href: string):SVGSVGElement => {
  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  
  svgElement.classList.add(...classSvg);
  svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  
  const useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  useElement.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href', href);

  svgElement.append(useElement);

  return svgElement;
}

function createButtonWithSVG(parentClasses: string[], childClasses: string[], href: string):HTMLElement {
  const svgButton = document.createElement('button');
  svgButton.append(createSvgSpread(childClasses, href));
  svgButton.classList.add(...parentClasses);
  return svgButton;
};

const buttonPerson = createButtonWithSVG(
  headerClasses.svgButtonPerson, 
  headerClasses.svgPicture, 
  '/svg/sprite.svg#person');

const buttonBasket = createButtonWithSVG(headerClasses.svgButtonBasket, 
  headerClasses.svgPicture, 
  '/svg/sprite.svg#basket');
 
const leftNav = createNav({
  children: [
    createButton({ 
      classes: headerClasses.menuItem, 
      events: {click: () => {
        console.log('Go to Page Catalog')}},
      text: 'Catalog' 
    }),
    createButton({ 
      classes: headerClasses.menuItem,
      events: {click: () => {
        console.log('Go to Page About Us')
      }},
      text: 'About Us' }),
  ],
  classes: headerClasses.leftMenu,
});

const logo = createH1({
  classes: headerClasses.logo,
  events: {click: () => {
    console.log('Go to Main page');
  }},
  text: 'yanki',
});

const rightNav = createNav({
  children: [
    createButton({ classes: [...headerClasses.menuItem, "not-logined"],
      events: {click: () => {
        console.log('Go to Login Page')
      }},
      text: 'log in' }),
    createButton({ 
      classes: [...headerClasses.menuItem, "not-logined"],
      events: {click: () => {
        console.log('Go to Registration Page')
      }},
      text: 'Sign up',
    }),
    createButton({ classes: [...headerClasses.menuItem, "logined"],
      events: {click: () => {
        console.log('Go to Main Page & Log Out');
      }},
      text: 'log out',
    }),
  ],
  classes: headerClasses.rightMenu,
});


export function createHeaderDOM():HTMLElement {
  buttonPerson.addEventListener("click", () => {
    console.log('Person ckliked')
  });
  buttonBasket.addEventListener("click", () => {
    console.log('Basket ckliked')
  });

  const iconsDiv = createDiv({
    children: [buttonPerson, buttonBasket,],
    classes: headerClasses.svgDiv,
  });

  const header = createHeader({
    children: [leftNav, logo, rightNav, iconsDiv],
    classes: headerClasses.header,
  });
  return header;
};