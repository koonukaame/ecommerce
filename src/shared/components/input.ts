import { createInput } from "../../utils/create-elements/create-tags";
import { inputStyles } from "../styles";

export function createInputField(type: string, placeholder: string, parent: HTMLElement, onInputEvent: (value: string) => void): void {
    createInput({
    attributes: { autocomplete: 'true', placeholder, type },
    classes: inputStyles.general,
    events: {
      input: (event) => {
        const target = event.currentTarget;
        if (target instanceof HTMLInputElement) {
          onInputEvent(target.value);
        }
      },
    },
    parent,
  })
};