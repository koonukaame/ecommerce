import { createButtonWithSVG } from '../../utils/create-elements/create-svg-buttom';
import { createButton } from '../../utils/create-elements/create-tags';
import { HEADER_CLASSES } from './constants';
import { BUTTONS_CONFIG } from './constants';

export const about = createButton(BUTTONS_CONFIG.about);

export const login = createButton(BUTTONS_CONFIG.login);

export const registration = createButton(BUTTONS_CONFIG.registration);

export const logout = createButton(BUTTONS_CONFIG.logout);

export const catalog = createButton(BUTTONS_CONFIG.catalog);

export const person = createButtonWithSVG(
  HEADER_CLASSES.svgButtonPerson,
  HEADER_CLASSES.svgPicture,
  '/svg/sprite.svg#person',
  { click: () => {
    console.log('Person clicked');
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

