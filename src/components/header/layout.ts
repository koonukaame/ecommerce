import './header.css';
import { 
  createDiv, 
  createHeader, 
  createNav,
} from '../../utils/create-elements/create-tags';
import { aboutButton, 
  buttonBasket, 
  buttonPerson, 
  calalogButton, 
  HEADER_CLASSES, 
  loginButton, 
  logo, 
  logoutButton, 
  registrationButton, 
} from './constants';

const aboutNAV = createNav({
  children: [
    calalogButton,
    aboutButton,
  ],
  classes: HEADER_CLASSES.leftMenu,
});

const loginNAV = createNav({
  children: [
    loginButton,
    registrationButton,
    logoutButton,
  ],
  classes: HEADER_CLASSES.rightMenu,
});

export function createHeaderDOM():HTMLElement {
  const iconsDiv = createDiv({
    children: [buttonPerson, buttonBasket,],
    classes: HEADER_CLASSES.svgDiv,
  });

  const header = createHeader({
    children: [aboutNAV, logo, loginNAV, iconsDiv],
    classes: HEADER_CLASSES.header,
  });
  return header;
};