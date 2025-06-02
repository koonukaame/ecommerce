import { optionalBillingState } from '../../../app/state/profile/optional-billing-state';
import { createButtonsConfig } from '../../../helpers/button-config-creator';
import { secondOptionalAddressEmitter } from '../../../helpers/buttons-emitter';
import { optionalBillingEmitterAsync } from '../../../helpers/update-personal-data-emitter';
import { createPopupMessage } from '../../../shared/components/popup';
import { ERROR_MESSAGES, REGEX } from '../../../shared/constants';
import { inputAddressValidation } from '../../../utils/validation/profile/input-validation';
import { validateDataForm } from '../../../utils/validation/profile/personal-data-form-validation';
import { MESSAGES, PROFILE_CLASSES, SERVER_ERROR_MESSAGES } from '../constants';

export const OPTIONAL_BILLING_CONFIG = {
  countries: {
    attributes: {
      disabled: 'true',
      name: 'country',
    },
    classes: PROFILE_CLASSES.select,
    events: {
      change: (event: Event) => {
        if (event.target instanceof HTMLSelectElement) {
          optionalBillingState.country.value = event.target.value;
          optionalBillingState.country.error = false;
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
        inputAddressValidation(optionalBillingState, event, REGEX.GENERAL, ERROR_MESSAGES.CITY);
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
          inputAddressValidation(optionalBillingState, event, REGEX.POSTAL_CODE, ERROR_MESSAGES.POSTAL_CODE);
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
        inputAddressValidation(optionalBillingState, event, REGEX.STREET, ERROR_MESSAGES.STREET);
      },
    },
  },
};

export const OPTIONAL_BILLING_BUTTONS_CONFIG = createButtonsConfig(
  {
    onEdit: () => secondOptionalAddressEmitter.emit('editBtnClick'),

    onSave: async () => {
      try {
        const isFormValid = validateDataForm(optionalBillingState);

        if (!isFormValid) {
          createPopupMessage(MESSAGES.INVALID_ADDRESS, false);
          return;
        }

        await optionalBillingEmitterAsync.emit('updateAddress');
        secondOptionalAddressEmitter.emit('saveBtnClick');

        createPopupMessage(MESSAGES.ADDRESS_SAVED, true);
      } catch (error) {
        if (error instanceof Error) {
          createPopupMessage(error.message, false);
          return;
        }
        createPopupMessage(SERVER_ERROR_MESSAGES.ADDRESS, false);
      }
    },

    onCancel: () => secondOptionalAddressEmitter.emit('cancelBtnClick'),

    onRemove: () => secondOptionalAddressEmitter.emit('removeBtnClick'),
  },
  { edit: PROFILE_CLASSES.buttonAddressEdit },
);
