import warningIcon from '../../assets/warning.svg';
import { createDiv, createImg } from "../../utils/create-elements/create-tags";
import { ERROR } from "../styles";

export function createErrorMessage(message: string, parent: HTMLElement, isServerError: boolean = false): void {
  const error = createDiv({
    classes: ERROR.general,
    parent,
  });

  if (isServerError) {
    createImg({
      attributes: {
        alt: 'Warning',
        src: warningIcon,
      },
      classes: ERROR.icon,
      parent: error,
    });
  }

  createDiv({
    parent: error,
    text: message,
  });
}
