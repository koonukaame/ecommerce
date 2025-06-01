import { shippingAddressState } from '../../../app/state/profile/default-shipping-state';
import { createButtonsConfig } from '../../../helpers/button-config-creator';
import { defaultShippingAddressEmitter } from '../../../helpers/buttons-emitter';
import { defaultShippingEmitterAsync } from '../../../helpers/update-personal-data-emitter';
import { createPopupMessage } from '../../../shared/components/popup';
import { ERROR_MESSAGES, REGEX } from '../../../shared/constants';
import { inputAddressValidation } from '../../../utils/validation/profile/input-validation';
import { validateDataForm } from '../../../utils/validation/profile/personal-data-form-validation';
import { MESSAGES, PROFILE_CLASSES, SERVER_ERROR_MESSAGES } from '../constants';

export const DEFAULT_SHIPPING_CONFIG = {
  countries: {
    attributes: {
      disabled: 'true',
      name: 'country',
    },
    classes: PROFILE_CLASSES.select,
    events: {
      change: (event: Event) => {
        if (event.target instanceof HTMLSelectElement) {
          shippingAddressState.country.value = event.target.value;
          shippingAddressState.country.error = false;
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
        inputAddressValidation(shippingAddressState, event, REGEX.GENERAL, ERROR_MESSAGES.CITY);
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
          inputAddressValidation(shippingAddressState, event, REGEX.POSTAL_CODE, ERROR_MESSAGES.POSTAL_CODE);
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
        inputAddressValidation(shippingAddressState, event, REGEX.STREET, ERROR_MESSAGES.STREET);
      },
    },
  },
};

export const DEFAULT_SHIPPING_BUTTONS_CONFIG = createButtonsConfig(
  {
    onEdit: () => defaultShippingAddressEmitter.emit('editBtnClick'),

    onSave: async () => {
      try {
        const isFormValid = validateDataForm(shippingAddressState);

        if (!isFormValid) {
          createPopupMessage(MESSAGES.INVALID_ADDRESS, false);
          return;
        }

        await defaultShippingEmitterAsync.emit('updateAddress');
        defaultShippingAddressEmitter.emit('saveBtnClick');

        createPopupMessage(MESSAGES.ADDRESS_SAVED, true);
      } catch (error) {
        if (error instanceof Error) {
          createPopupMessage(error.message, false);
          return;
        }
        createPopupMessage(SERVER_ERROR_MESSAGES.ADDRESS, false);
      }
    },

    onCancel: () => defaultShippingAddressEmitter.emit('cancelBtnClick'),
  },
  { edit: PROFILE_CLASSES.buttonAddressEdit },
);
