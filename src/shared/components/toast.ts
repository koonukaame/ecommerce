import { toggleToastAnimation } from '../../helpers/toast-animation';
import { createDiv } from '../../utils/create-elements/create-tags';
import { FADE_MS, VISIBLE_MS } from '../constants';
import { TOAST } from '../styles';

export function createToastMessage(message: string, isSuccess: boolean): HTMLElement {
  const classes = [...(isSuccess ? TOAST.success : TOAST.error), ...TOAST.general, ...TOAST.fadeOut];

  const toast = createDiv({ classes, parent: document.body, text: message });

  requestAnimationFrame(() => {
    toggleToastAnimation(toast, TOAST.fadeOut, TOAST.fadeIn);
  });

  setTimeout(() => {
    toggleToastAnimation(toast, TOAST.fadeIn, TOAST.fadeOut);

    setTimeout(() => {
      toast.remove();
    }, FADE_MS);
  }, VISIBLE_MS);

  return toast;
}
