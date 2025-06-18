import { handleTransitionEnd, togglePopupAnimation } from '../../helpers/popup-animation';
import { createDiv } from '../../utils/create-elements/create-tags';
import { VISIBLE_MS } from '../constants';
import { POPUP } from '../styles';

export function createPopupMessage(message: string, isSuccess: boolean): HTMLElement {
  const classes = [...(isSuccess ? POPUP.success : POPUP.error), ...POPUP.general, ...POPUP.fadeOut];

  const popup = createDiv({ classes, parent: document.body, text: message });

  requestAnimationFrame(() => {
    togglePopupAnimation(popup, POPUP.fadeOut, POPUP.fadeIn);
  });

  setTimeout(() => {
    togglePopupAnimation(popup, POPUP.fadeIn, POPUP.fadeOut);
  }, VISIBLE_MS);

  popup.addEventListener('transitionend', handleTransitionEnd);

  return popup;
}
