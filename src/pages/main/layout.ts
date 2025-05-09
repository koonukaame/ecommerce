import './style.css';
import { createA, createDiv, createHr, createMain, createP } from '../../utils/create-elements/create-tags';
import { MAIN_CLASSES, MAIN_CONFIG } from './constants';

const p = createP(MAIN_CONFIG.text);

const line = createHr(MAIN_CONFIG.line);

const link = createA(MAIN_CONFIG.link);

export function Main ():HTMLElement {
  const linkContainer = createDiv(
    {
      children : [ p, line, link ],
      classes: MAIN_CLASSES.linkContainer,
    }
  )
  const main = createMain({
    children: [linkContainer],
    classes: MAIN_CLASSES.wrapper,
    parent: document.body,
  });
  
  return main;
}