import { createButton } from "../../utils/create-elements/create-tags";
import { BUTTON } from "../styles";

export function createFunctionalityButton(type: string, text: string, parent: HTMLElement, onClickEvent: () => void): void {
    createButton({
    attributes: { 
      type, 
    },
    classes: [...BUTTON.general, ...BUTTON.generalHover, ...BUTTON.generalFocus],
    events: {
      click: () => {
        onClickEvent();
      },
    },
    parent,
    text,
  })
};