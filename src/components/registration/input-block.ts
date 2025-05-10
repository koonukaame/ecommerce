import { errorWrapper } from "../../shared/components/error-wrapper";
import { billingSelect, shippingSelect } from "../../shared/components/select";
import { email, password } from "../../shared/ui-config/credential-inputs";
import { billingCity, billingPostalCode, billingStreet, birthDate, firstName, lastName, shippingCity, shippingPostalCode, shippingStreet } from "./input";

export const firstNameBlock = errorWrapper(firstName);

export const lastNameBlock = errorWrapper(lastName);

export const birthdateBlock = errorWrapper(birthDate);

export const billingCityBlock = errorWrapper(billingCity);

export const shippingCityBlock = errorWrapper(shippingCity);

export const shippingPostalCodeCode = errorWrapper(shippingPostalCode);

export const billingPostalCodeBlock = errorWrapper(billingPostalCode);

export const shippingStreetBlock = errorWrapper(shippingStreet);

export const billingStreetBlock = errorWrapper(billingStreet);

export const emailBlock = errorWrapper(email);

export const passwordBlock = errorWrapper(password);

export const shippingSelectBlock = errorWrapper(shippingSelect);

export const billingSelectBlock = errorWrapper(billingSelect);