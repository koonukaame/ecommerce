import { REGISTRATION_INPUTS_CONFIG } from "../../pages/registration/constants";
import { createInput } from "../../utils/create-elements/create-tags";

export const firstName = createInput(REGISTRATION_INPUTS_CONFIG.firstname);

export const lastName = createInput(REGISTRATION_INPUTS_CONFIG.lastname);

export const birthDate = createInput(REGISTRATION_INPUTS_CONFIG.birthdate);

export const shippingCity = createInput(REGISTRATION_INPUTS_CONFIG.city);

export const shippingPostalCode = createInput(REGISTRATION_INPUTS_CONFIG.postalcode);

export const shippingStreet = createInput(REGISTRATION_INPUTS_CONFIG.street);

export const billingCity = createInput(REGISTRATION_INPUTS_CONFIG.city);

export const billingPostalCode = createInput(REGISTRATION_INPUTS_CONFIG.postalcode);

export const billingStreet = createInput(REGISTRATION_INPUTS_CONFIG.street);
