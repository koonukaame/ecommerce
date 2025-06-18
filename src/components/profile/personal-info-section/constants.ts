import { profileDataState } from '../../../app/state/profile/profile-state';
import { createButtonsConfig } from '../../../helpers/button-config-creator';
import { personalInfoEmitter } from '../../../helpers/buttons-emitter';
import { resetStateToDefault } from '../../../helpers/reset-state-to-default';
import { personalDataEmitterAsync } from '../../../helpers/update-personal-data-emitter';
import { createPopupMessage } from '../../../shared/components/popup';
import { ERROR_MESSAGES, REGEX } from '../../../shared/constants';
import { dateOfBirthValidation, inputValidation } from '../../../utils/validation/profile/input-validation';
import { validateDataForm } from '../../../utils/validation/profile/personal-data-form-validation';
import { MESSAGES, PROFILE_CLASSES, SERVER_ERROR_MESSAGES } from '../constants';

export const PROFILE_BUTTONS_CONFIG = createButtonsConfig({
  onEdit: () => personalInfoEmitter.emit('editBtnClick'),

  onSave: async () => {
    try {
      const isFormValid = validateDataForm(profileDataState);

      if (!isFormValid) {
        createPopupMessage(MESSAGES.INVALID_DATA, false);
        return;
      }

      await personalDataEmitterAsync.emit('updateUserData');
      personalInfoEmitter.emit('saveBtnClick');

      resetStateToDefault(profileDataState);
      createPopupMessage(MESSAGES.INFORMATION_SAVED, true);
    } catch (error) {
      if (error instanceof Error) {
        createPopupMessage(error.message, false);
        return;
      }

      createPopupMessage(SERVER_ERROR_MESSAGES.EMAIL, false);
    }
  },

  onCancel: () => personalInfoEmitter.emit('cancelBtnClick'),
});

export const PROFILE_CONFIG = {
  birthdate: {
    attributes: {
      name: 'dateOfBirth',
      type: 'date',
      disabled: 'true',
    },
    classes: PROFILE_CLASSES.input,
    events: {
      change: (event: Event) => {
        dateOfBirthValidation(event, ERROR_MESSAGES.AGE_RESTRICTION);
      },
    },
  },
  firstname: {
    attributes: {
      autocomplete: 'true',
      name: 'firstName',
      placeholder: 'Enter first name*',
      type: 'text',
      disabled: 'true',
    },
    classes: PROFILE_CLASSES.input,
    events: {
      input: (event: Event) => {
        inputValidation(event, REGEX.GENERAL, ERROR_MESSAGES.FIRST_NAME);
      },
    },
  },
  lastname: {
    attributes: {
      name: 'lastName',
      placeholder: 'Enter last name*',
      type: 'text',
      disabled: 'true',
    },
    classes: PROFILE_CLASSES.input,
    events: {
      input: (event: Event) => {
        inputValidation(event, REGEX.GENERAL, ERROR_MESSAGES.LAST_NAME);
      },
    },
  },
  email: {
    attributes: {
      autocomplete: 'true',
      name: 'email',
      placeholder: 'Enter email*',
      type: 'email',
      disabled: 'true',
    },
    classes: PROFILE_CLASSES.input,
    events: {
      input: (event: Event) => {
        inputValidation(event, REGEX.EMAIL_DOMAIN_NAME, ERROR_MESSAGES.EMAIL_DOMAIN_NAME);
        if (!profileDataState.email.error) {
          inputValidation(event, REGEX.EMAIL_AT, ERROR_MESSAGES.EMAIL_AT);
        }
        if (!profileDataState.email.error) {
          inputValidation(event, REGEX.EMAIL, ERROR_MESSAGES.EMAIL);
        }
      },
    },
  },
};
