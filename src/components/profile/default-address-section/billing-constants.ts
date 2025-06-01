import { billingAddressState } from '../../../app/state/profile/default-billing-state';
import { createButtonsConfig } from '../../../helpers/button-config-creator';
import { defaultBillingAddressEmitter } from '../../../helpers/buttons-emitter';
import { billingAddressEmitterAsync } from '../../../helpers/update-personal-data-emitter';
import { createPopupMessage } from '../../../shared/components/popup';
import { ERROR_MESSAGES, REGEX } from '../../../shared/constants';
import { inputAddressValidation } from '../../../utils/validation/profile/input-validation';
import { validateDataForm } from '../../../utils/validation/profile/personal-data-form-validation';
import { MESSAGES, PROFILE_CLASSES, SERVER_ERROR_MESSAGES } from '../constants';

export const DEFAULT_BILLING_CONFIG = {
  countries: {
    attributes: {
      disabled: 'true',
      name: 'country',
    },
    classes: PROFILE_CLASSES.select,
    events: {
      change: (event: Event) => {
        if (event.target instanceof HTMLSelectElement) {
          billingAddressState.country.value = event.target.value;
          billingAddressState.country.error = false;
        }
      },
    },
  },
  city: {
    attributes: {
      disabled: 'true',
      name: 'city',
      placeholder: 'Enter city*',
      type: 'text',
    },
    classes: PROFILE_CLASSES.input,
    events: {
      input: (event: Event) => {
        inputAddressValidation(billingAddressState, event, REGEX.GENERAL, ERROR_MESSAGES.CITY);
      },
    },
  },
  postalcode: {
    attributes: {
      disabled: 'true',
      name: 'postalCode',
      placeholder: 'Enter postal code*',
      type: 'text',
    },
    classes: PROFILE_CLASSES.input,
    events: {
      input: (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
          inputAddressValidation(billingAddressState, event, REGEX.POSTAL_CODE, ERROR_MESSAGES.POSTAL_CODE);
        }
      },
    },
  },
  street: {
    attributes: {
      disabled: 'true',
      name: 'streetName',
      placeholder: 'Enter street*',
      type: 'text',
    },
    classes: PROFILE_CLASSES.input,
    events: {
      input: (event: Event) => {
        inputAddressValidation(billingAddressState, event, REGEX.STREET, ERROR_MESSAGES.STREET);
      },
    },
  },
};

export const DEFAULT_BILLING_BUTTONS_CONFIG = createButtonsConfig(
  {
    onEdit: () => defaultBillingAddressEmitter.emit('editBtnClick'),

    onSave: async () => {
      try {
        const isFormValid = validateDataForm(billingAddressState);

        if (!isFormValid) {
          createPopupMessage(MESSAGES.INVALID_ADDRESS, false);
          return;
        }

        await billingAddressEmitterAsync.emit('updateAddress');
        defaultBillingAddressEmitter.emit('saveBtnClick');

        createPopupMessage(MESSAGES.ADDRESS_SAVED, true);
      } catch (error) {
        if (error instanceof Error) {
          createPopupMessage(error.message, false);
          return;
        }
        createPopupMessage(SERVER_ERROR_MESSAGES.ADDRESS, false);
      }
    },

    onCancel: () => defaultBillingAddressEmitter.emit('cancelBtnClick'),
  },
  { edit: PROFILE_CLASSES.buttonAddressEdit },
);
