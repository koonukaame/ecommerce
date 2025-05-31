import { shippingAddressState } from '../../../app/state/profile/default-shipping-state';
import { createButtonsConfig } from '../../../helpers/button-config-creator';
import { defaultShippingAddressEmitter } from '../../../helpers/buttons-emitter';
import { shippingAddressEmitterAsync } from '../../../helpers/update-personal-data-emitter';
import { createPopupMessage } from '../../../shared/components/popup';
import { ERROR_MESSAGES, REGEX } from '../../../shared/constants';
import { inputAddressValidation } from '../../../utils/validation/profile/input-validation';
import { validateDataForm } from '../../../utils/validation/profile/personal-data-form-validation';
import { PROFILE_CLASSES } from '../constants';

export const SHIPPING_ADDRESS_CONFIG = {
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
          console.log(shippingAddressState);
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

export const DEFAULT_ADDRESS_BUTTONS_CONFIG = createButtonsConfig(
  {
    onEdit: () => defaultShippingAddressEmitter.emit('editBtnClick'),

    onSave: async () => {
      try {
        const isFormValid = validateDataForm(shippingAddressState);

        if (!isFormValid) {
          createPopupMessage('Адрес не сохранен, невалидный стейт', false);
          return;
        }

        await shippingAddressEmitterAsync.emit('updateShippingAddress');
        defaultShippingAddressEmitter.emit('saveBtnClick');

        createPopupMessage('адрес сохранен', true);
      } catch (error) {
        if (error instanceof Error) {
          createPopupMessage(error.message, false);
          return;
        }
        createPopupMessage('адрес не сохранен', false);
      }
    },

    onCancel: () => defaultShippingAddressEmitter.emit('cancelBtnClick'),
  },
  { edit: PROFILE_CLASSES.buttonAddressEdit },
);
