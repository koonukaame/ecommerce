import './header.css';
import { logo } from '../../shared/components/logo/logo';
import { 
  createDiv, 
  createHeader, 
  createNav,
} from '../../utils/create-elements/create-tags';
import {
  about,
  basket,
  calalog,
  login,
  logout,
  person,
  registration,
} from './buttons';
import {  
  HEADER_CLASSES, 
} from './constants';

export function Header():HTMLElement {
  const aboutNAV = createNav({
    children: [ calalog, about, ],
    classes: HEADER_CLASSES.leftMenu,
  });
  
  const loginNAV = createNav({
    children: [ login, registration, logout, ],
    classes: HEADER_CLASSES.rightMenu,
  });
  
  const iconsDiv = createDiv({
    children: [ person, basket, ],
    classes: HEADER_CLASSES.svgDiv,
  });

  const header = createHeader({
    children: [ aboutNAV, logo, loginNAV, iconsDiv ],
    classes: HEADER_CLASSES.header,
  });
  return header;
};