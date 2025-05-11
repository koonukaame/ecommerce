import { REGISTRATION_INPUTS_CONFIG } from '../../pages/registration/constants';
import { createWrappedInput } from '../../shared/components/input';

export const firstNameInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.firstname);

export const lastNameInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.lastname);

export const birthDateInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.birthdate);

export const cityInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.city);

export const postalCodeInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.postalcode);

export const streetInput = createWrappedInput(REGISTRATION_INPUTS_CONFIG.street);
