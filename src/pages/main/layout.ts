import './style.css';
import { container } from '../../shared/components/container';
import { createA, createDiv, createHr, createP } from '../../utils/create-elements/create-tags';
import { MAIN_CLASSES, MAIN_CONFIG } from './constants';

export function Main(): HTMLElement {
  const p = createP(MAIN_CONFIG.text);
  const line = createHr(MAIN_CONFIG.line);
  const link = createA(MAIN_CONFIG.link);

  const linkContainer = createDiv({
    children: [p, line, link],
    classes: MAIN_CLASSES.linkContainer,
  });

  // ? classes: MAIN_CLASSES.wrapper,
  container.append(linkContainer);
  return container;
}
