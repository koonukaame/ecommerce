import { createDiv } from '../../utils/create-elements/create-tags';
import { ERROR } from '../styles';

export function createInfoMessage(parent: HTMLDivElement, message: string): HTMLDivElement {
  const infoMessage = createDiv({
    classes: ERROR.info,
    parent,
    text: message,
  });

  return infoMessage;
}
