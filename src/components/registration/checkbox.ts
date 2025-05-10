import { REGISTRATION_CHECKBOXES_CONFIG } from "../../pages/registration/constants";
import { createInput } from "../../utils/create-elements/create-tags";

export const defaultShippingAddress = createInput(REGISTRATION_CHECKBOXES_CONFIG.defaultShippingAddress);

export const sameAddress = createInput(REGISTRATION_CHECKBOXES_CONFIG.sameAddress);

export const defaultBillingAddress = createInput(REGISTRATION_CHECKBOXES_CONFIG.defaultBillingAddress);
