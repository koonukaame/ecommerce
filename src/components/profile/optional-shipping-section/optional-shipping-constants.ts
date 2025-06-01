import { optionalShippingState } from '../../../app/state/profile/optional-shipping-state';
import { createButtonsConfig } from '../../../helpers/button-config-creator';
import { firstOptionalAddressEmitter } from '../../../helpers/buttons-emitter';
import { firstOptionalAddressEmitterAsync } from '../../../helpers/update-personal-data-emitter';
import { createPopupMessage } from '../../../shared/components/popup';
import { ERROR_MESSAGES, REGEX } from '../../../shared/constants';
import { inputAddressValidation } from '../../../utils/validation/profile/input-validation';
import { validateDataForm } from '../../../utils/validation/profile/personal-data-form-validation';
import { MESSAGES, PROFILE_CLASSES, SERVER_ERROR_MESSAGES } from '../constants';

export const OPTIONAL_SHIPPING_CONFIG = {
  countries: {
    attributes: {
      disabled: 'true',
      name: 'country',
    },
    classes: PROFILE_CLASSES.select,
    events: {
      change: (event: Event) => {
        if (event.target instanceof HTMLSelectElement) {
          optionalShippingState.country.value = event.target.value;
          optionalShippingState.country.error = false;
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
        inputAddressValidation(optionalShippingState, event, REGEX.GENERAL, ERROR_MESSAGES.CITY);
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
          inputAddressValidation(optionalShippingState, event, REGEX.POSTAL_CODE, ERROR_MESSAGES.POSTAL_CODE);
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
        inputAddressValidation(optionalShippingState, event, REGEX.STREET, ERROR_MESSAGES.STREET);
      },
    },
  },
};

export const OPTIONAL_SHIPPING_BUTTONS_CONFIG = createButtonsConfig(
  {
    onEdit: () => firstOptionalAddressEmitter.emit('editBtnClick'),

    onSave: async () => {
      try {
        const isFormValid = validateDataForm(optionalShippingState);

        if (!isFormValid) {
          createPopupMessage(MESSAGES.INVALID_ADDRESS, false);
          return;
        }

        await firstOptionalAddressEmitterAsync.emit('updateAddress');
        firstOptionalAddressEmitter.emit('saveBtnClick');

        createPopupMessage(MESSAGES.ADDRESS_SAVED, true);
      } catch (error) {
        if (error instanceof Error) {
          createPopupMessage(error.message, false);
          return;
        }
        createPopupMessage(SERVER_ERROR_MESSAGES.ADDRESS, false);
      }
    },

    onCancel: () => firstOptionalAddressEmitter.emit('cancelBtnClick'),
  },
  { edit: PROFILE_CLASSES.buttonAddressEdit },
);
