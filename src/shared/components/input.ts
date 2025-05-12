import { createDiv, createInput } from '../../utils/create-elements/create-tags';
import { ERROR_WRAPPER } from '../styles';

export type WrappedInput = {
  container: HTMLDivElement;
  errorContainer: HTMLDivElement;
  input: HTMLInputElement;
};

import type { RegistrationInputsProps } from '../../components/registration/input';
import type { BaseInputsProps } from '../ui-config/credential-inputs';

export const createWrappedInput = (config: BaseInputsProps | RegistrationInputsProps): WrappedInput => {
  const input = createInput(config);

  const errorContainer = createDiv({});

  const container = createDiv({
    children: [input, errorContainer],
    classes: ERROR_WRAPPER.general,
  });

  return {
    container,
    errorContainer,
    input,
  };
};
