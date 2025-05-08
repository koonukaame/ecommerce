import { CREDENTIALS_INPUT_CONFIG } from "../../shared/ui-configs/credential-inputs";
import { createInput } from "../../utils/create-elements/create-tags";


export const emailInput = createInput(CREDENTIALS_INPUT_CONFIG.email);

export const passwordInput = createInput(CREDENTIALS_INPUT_CONFIG.password);