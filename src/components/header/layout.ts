import './header.css';
import { createButtonWithSVG } from '../../utils/create-elements/create-svg-buttom';
import { 
  createButton,
  createDiv,
  createH1, 
  createHeader, 
  createNav,
 } from '../../utils/create-elements/create-tags';
 import { HEADER_CLASSES } from './constants';

const buttonPerson = createButtonWithSVG(
  HEADER_CLASSES.svgButtonPerson, 
  HEADER_CLASSES.svgPicture,
  '/svg/sprite.svg#person');

const buttonBasket = createButtonWithSVG(HEADER_CLASSES.svgButtonBasket, 
  HEADER_CLASSES.svgPicture, 
  '/svg/sprite.svg#basket');
 
const leftNav = createNav({
  children: [
    createButton({ 
      classes: HEADER_CLASSES.menuItem, 
      events: {click: () => {
        console.log('Go to Page Catalog')}},
      text: 'Catalog' 
    }),
    createButton({ 
      classes: HEADER_CLASSES.menuItem,
      events: {click: () => {
        console.log('Go to Page About Us')
      }},
      text: 'About Us' }),
  ],
  classes: HEADER_CLASSES.leftMenu,
});

const logo = createH1({
  classes: HEADER_CLASSES.logo,
  events: {click: () => {
    console.log('Go to Main page');
  }},
  text: 'yanki',
});

const rightNav = createNav({
  children: [
    createButton({ classes: [...HEADER_CLASSES.menuItem, "not-logined"],
      events: {click: () => {
        console.log('Go to Login Page')
      }},
      text: 'log in' }),
    createButton({ 
      classes: [...HEADER_CLASSES.menuItem, "not-logined"],
      events: {click: () => {
        console.log('Go to Registration Page')
      }},
      text: 'Sign up',
    }),
    createButton({ classes: [...HEADER_CLASSES.menuItem, "logined"],
      events: {click: () => {
        console.log('Go to Main Page & Log Out');
      }},
      text: 'log out',
    }),
  ],
  classes: HEADER_CLASSES.rightMenu,
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
    classes: HEADER_CLASSES.svgDiv,
  });

  const header = createHeader({
    children: [leftNav, logo, rightNav, iconsDiv],
    classes: HEADER_CLASSES.header,
  });
  return header;
};