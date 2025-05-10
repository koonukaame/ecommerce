import { createDiv } from "../../utils/create-elements/create-tags";
import { ERROR_WRAPPER } from "../styles";

type ErrorWrapper = {
  error: HTMLDivElement;
  wrapper: HTMLDivElement;
}

export function errorWrapper(input: HTMLElement): ErrorWrapper {
  const error = createDiv({});

  const wrapper = createDiv({
    children: [input, error],
    classes: ERROR_WRAPPER.general,
  });

  return { error, wrapper };
}
