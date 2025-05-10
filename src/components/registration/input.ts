import { REGISTRATION_INPUTS_CONFIG } from "../../pages/registration/constants";
import { createInput } from "../../utils/create-elements/create-tags";

export const firstNameInput = createInput(REGISTRATION_INPUTS_CONFIG.firstname);

export const lastNameInput = createInput(REGISTRATION_INPUTS_CONFIG.lastname);

export const birthDateInput = createInput(REGISTRATION_INPUTS_CONFIG.birthdate);

export const cityInput = createInput(REGISTRATION_INPUTS_CONFIG.city);

export const postalCodeInput = createInput(REGISTRATION_INPUTS_CONFIG.postalcode);

export const streetInput = createInput(REGISTRATION_INPUTS_CONFIG.street);
