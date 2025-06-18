import { getUserInfo } from '../../../app/api';
import { clearToken, getToken, loginAndSaveToken } from '../../../app/auth-service';
import { passwordState } from '../../../app/state/profile/password-state';
import { createButtonsConfig } from '../../../helpers/button-config-creator';
import { passwordEmitter } from '../../../helpers/buttons-emitter';
import { resetStateToDefault } from '../../../helpers/reset-state-to-default';
import { passwordEmitterAsync } from '../../../helpers/update-personal-data-emitter';
import { createPopupMessage } from '../../../shared/components/popup';
import { ERROR_MESSAGES, REGEX } from '../../../shared/constants';
import { inputPasswordValidation } from '../../../utils/validation/profile/input-validation';
import { validateDataForm } from '../../../utils/validation/profile/personal-data-form-validation';
import { MESSAGES, PROFILE_CLASSES, SERVER_ERROR_MESSAGES } from '../constants';

export const PASSWORD_CONFIG = {
  currentPassword: {
    attributes: {
      disabled: 'true',
      autocomplete: 'true',
      name: 'currentPassword',
      placeholder: 'Enter your current password*',
      type: 'password',
    },
    classes: PROFILE_CLASSES.input,
    events: {
      input: (event: Event) => {
        inputPasswordValidation(event, REGEX.PASSWORD_LOWERCASE, ERROR_MESSAGES.PASSWORD_LOWERCASE);
        if (!passwordState.currentPassword.error) {
          inputPasswordValidation(event, REGEX.PASSWORD_UPPERCASE, ERROR_MESSAGES.PASSWORD_UPPERCASE);
        }
        if (!passwordState.currentPassword.error) {
          inputPasswordValidation(event, REGEX.PASSWORD_NUMBER, ERROR_MESSAGES.PASSWORD_NUMBER);
        }
        if (!passwordState.currentPassword.error) {
          inputPasswordValidation(event, REGEX.PASSWORD_LENGTH, ERROR_MESSAGES.PASSWORD_LENGTH);
        }
      },
    },
  },
  newPassword: {
    attributes: {
      disabled: 'true',
      autocomplete: 'true',
      name: 'newPassword',
      placeholder: 'Enter your new password*',
      type: 'password',
    },
    classes: PROFILE_CLASSES.input,
    events: {
      input: (event: Event) => {
        inputPasswordValidation(event, REGEX.PASSWORD_LOWERCASE, ERROR_MESSAGES.PASSWORD_LOWERCASE);
        if (!passwordState.newPassword.error) {
          inputPasswordValidation(event, REGEX.PASSWORD_UPPERCASE, ERROR_MESSAGES.PASSWORD_UPPERCASE);
        }
        if (!passwordState.newPassword.error) {
          inputPasswordValidation(event, REGEX.PASSWORD_NUMBER, ERROR_MESSAGES.PASSWORD_NUMBER);
        }
        if (!passwordState.newPassword.error) {
          inputPasswordValidation(event, REGEX.PASSWORD_LENGTH, ERROR_MESSAGES.PASSWORD_LENGTH);
        }
      },
    },
  },
};

export const PASSWORD_BUTTONS_CONFIG = createButtonsConfig({
  onEdit: () => passwordEmitter.emit('editBtnClick'),

  onSave: async () => {
    try {
      const isFormValid = validateDataForm(passwordState);

      if (!isFormValid) {
        createPopupMessage(MESSAGES.INVALID_PASSWORD, false);
        return;
      }

      const token = getToken();
      if (!token) {
        return;
      }

      const userInfo = await getUserInfo(token);
      if (!('id' in userInfo)) {
        return;
      }

      await passwordEmitterAsync.emit('updatePassword');

      clearToken();

      await loginAndSaveToken(userInfo.email, passwordState.newPassword.value);

      passwordEmitter.emit('saveBtnClick');

      createPopupMessage(MESSAGES.PASSWORD_SAVED, true);
      resetStateToDefault(passwordState);
    } catch (error) {
      if (error instanceof Error) {
        createPopupMessage(error.message, false);
        return;
      }
      createPopupMessage(SERVER_ERROR_MESSAGES.PASSWORD, false);
    }
  },

  onCancel: () => passwordEmitter.emit('cancelBtnClick'),
});
