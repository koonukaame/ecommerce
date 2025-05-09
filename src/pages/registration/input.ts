import { CREDENTIALS_INPUT_CONFIG } from "../../shared/ui-config/credential-inputs";
import { createInput } from "../../utils/create-elements/create-tags";
import { REGISTRATION_INPUTS_CONFIG } from "./constants";


export const emailInput = createInput(CREDENTIALS_INPUT_CONFIG.email);

export const passwordInput = createInput(CREDENTIALS_INPUT_CONFIG.password);

export const firstName = createInput(REGISTRATION_INPUTS_CONFIG.firstname);

export const lastName = createInput(REGISTRATION_INPUTS_CONFIG.lastname);

export const birthDate = createInput(REGISTRATION_INPUTS_CONFIG.birthdate);

export const city = createInput(REGISTRATION_INPUTS_CONFIG.city);

export const postalCode = createInput(REGISTRATION_INPUTS_CONFIG.postalcode);

export const street = createInput(REGISTRATION_INPUTS_CONFIG.street);
