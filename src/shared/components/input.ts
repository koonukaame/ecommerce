import { createInput } from "../../utils/create-elements/create-tags";
import { INPUT } from "../styles";

export function createInputField(type: string, placeholder: string, parent: HTMLElement, onInputEvent: (value: string) => void): HTMLInputElement {
    const input = createInput({
    attributes: { 
      autocomplete: 'true', 
      placeholder, 
      type, 
    },
    classes: INPUT.general,
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

  return input;
};
