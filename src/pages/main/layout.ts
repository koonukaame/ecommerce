import './style.css';
import { container } from '../../shared/components/container';
import { createA, createDiv, createHr, createP } from '../../utils/create-elements/create-tags';
import { MAIN_CLASSES, MAIN_CONFIG, PROMOCODES } from './constants';
import { createActivePromocodeComponent } from '../../components/main/promocode';

export function Main(): HTMLElement {
  const p = createP(MAIN_CONFIG.text);
  const line = createHr(MAIN_CONFIG.line);
  const link = createA(MAIN_CONFIG.link);
  const promocodes = Object.values(PROMOCODES).map((promocode) => createActivePromocodeComponent(promocode));

  const linkContainer = createDiv({
    children: [p, line, link, ...promocodes],
    classes: MAIN_CLASSES.linkContainer,
  });

  container.append(linkContainer);
  return container;
}
