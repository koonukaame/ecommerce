import { createDiv } from "../../utils/create-elements/create-tags";
import { ERROR } from "../styles";

export function createErrorMessage(message: string, parent: HTMLElement): void {
  const error = createDiv({
    classes: ERROR.general,
    parent,
  });

  createDiv({
    parent: error,
    text: message,
  });
}
