import './header.css';
import { Page } from '../../app/constants';
import { changePath } from '../../app/router/handlers';
import { LOGO_CLASSES } from '../../shared/styles';
import { createDiv, createH1, createHeader, createNav } from '../../utils/create-elements/create-tags';
import { about, basket, catalog, login, logout, person, registration } from './buttons';
import { HEADER_CLASSES } from './constants';

export function Header(): void {
  const aboutNav = createNav({
    children: [catalog, about],
    classes: HEADER_CLASSES.leftMenu,
  });

  const logo = createH1({
    classes: LOGO_CLASSES,
    events: {
      click: changePath(Page.main),
    },
    text: 'yanki',
  });

  const loginNav = createNav({
    children: [login, registration, logout],
    classes: HEADER_CLASSES.rightMenu,
  });

  const iconsDiv = createDiv({
    children: [person, basket],
    classes: HEADER_CLASSES.svgDiv,
  });

  createHeader({
    children: [aboutNav, logo, loginNav, iconsDiv],
    classes: HEADER_CLASSES.header,
    parent: document.body,
  });
}
