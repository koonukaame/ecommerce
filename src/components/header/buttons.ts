import { createButtonWithSVG } from '../../utils/create-elements/create-svg-buttom';
import { createButton } from '../../utils/create-elements/create-tags';
import { HEADER_CLASSES } from './constants';

export const about = createButton({ 
  classes: HEADER_CLASSES.menuItem,
  events: {click: () => {
    console.log('Go to Page About Us')
  }},
  text: 'About Us' 
});

export const login = createButton({ classes: [...HEADER_CLASSES.menuItem, "not-logined"],
  events: {click: () => {
    console.log('Go to Login Page');
  }},
  text: 'log in',
});

export const registration = createButton({ 
  classes: [...HEADER_CLASSES.menuItem, "not-logined"],
  events: {click: () => {
    console.log('Go to Registration Page')
  }},
  text: 'Sign up',
});

export const logout = createButton({ classes: [...HEADER_CLASSES.menuItem, "logined"],
  events: {click: () => {
    console.log('Go to Main Page & Log Out');
  }},
  text: 'log out',
});

export const person = createButtonWithSVG(
  HEADER_CLASSES.svgButtonPerson, 
  HEADER_CLASSES.svgPicture,
  '/svg/sprite.svg#person',
  { click: () => {
    console.log('Person ckliked');
  }}
);

export const basket = createButtonWithSVG(
  HEADER_CLASSES.svgButtonBasket, 
  HEADER_CLASSES.svgPicture, 
  '/svg/sprite.svg#basket',
  { click: () => {
    console.log('Basket ckliked');
  }}
);

export const calalog = createButton({ 
  classes: HEADER_CLASSES.menuItem, 
  events: {click: () => {
    console.log('Go to Page Catalog');
  }},
  text: 'Catalog',
});
