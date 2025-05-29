import {
  dateOfBirthValidation,
  inputPasswordValidation,
  inputValidation,
} from '../../utils/validation/profile/input-validation';
import { ERROR_MESSAGES, REGEX } from '../../shared/constants';
import { validateDataForm } from '../../utils/validation/profile/personal-data-form-validation';
import { createPopupMessage } from '../../shared/components/popup';
import { profileDataState } from '../../app/state/profile/profile-state';
import { passwordEmitterAsync, personalDataEmitterAsync } from '../../helpers/update-personal-data-emitter';
import { passwordState } from '../../app/state/profile/password-state';
import { personalInfoEmitter, passwordEmitter } from '../../helpers/buttons-emitter';

export const PROFILE_CLASSES = {
  baseButton: [
    'w-20',
    'h-10',
    'text-lg',
    'text-white',
    'rounded',
    'absolute',
    'bg-(--hover-link-header)',
    'mt-0.5',
    'mr-1.5',
    'mb-2',
    'cursor-pointer',
    'disabled:bg-(--disabled-button-color)',
    'disabled:cursor-auto',
  ],
  buttonEdit: ['cursor-pointer', 'top-1', 'right-1'],
  buttonSave: ['mt-8', 'mb-1', 'inline', 'relative'],
  buttonCancel: ['inline', 'relative'],
  section: ['relative', 'w-full', 'border', 'border-black', 'pl-[10px]', 'text-[15px]'],
  label: ['text-[20px]', 'block'],
  wrapper: [
    'flex',
    'flex-col',
    'max-w-[600px]',
    'w-full',
    'items-center',
    'gap-[30px]',
    'p-3',
    'border',
    'border-[#252525]/50',
    'm-3',
  ],
  input: ['mt-2', 'border', 'border-gray-300', 'rounded', 'p-2', 'disabled:bg-gray-100', 'disabled:text-gray-500'],
};

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

export const BUTTONS_CONFIG = {
  edit: {
    classes: [...PROFILE_CLASSES.baseButton, ...PROFILE_CLASSES.buttonEdit],
    events: {
      click: async () => {
        personalInfoEmitter.emit('editBtnClick');
      },
    },
    text: 'Edit',
  },
  save: {
    attributes: {
      disabled: 'true',
    },
    classes: [...PROFILE_CLASSES.baseButton, ...PROFILE_CLASSES.buttonSave],
    events: {
      click: async () => {
        try {
          const isFormValid = validateDataForm(profileDataState);

          if (!isFormValid) {
            createPopupMessage('Please enter valid profile information', false);
            return;
          }

          await personalDataEmitterAsync.emit('updateUserData');
          personalInfoEmitter.emit('saveBtnClick');

          createPopupMessage('Your information has been successfully saved', true);
        } catch (error) {
          if (error instanceof Error) {
            createPopupMessage(error.message, false);
            return;
          }

          createPopupMessage('Unexpected error during updating email', false);
        }
      },
    },
    text: 'Save',
  },
  cancel: {
    attributes: {
      disabled: 'true',
    },
    classes: [...PROFILE_CLASSES.baseButton, ...PROFILE_CLASSES.buttonCancel],
    events: {
      click: () => {
        personalInfoEmitter.emit('cancelBtnClick');
      },
    },
    text: 'Cancel',
  },
};

export const PASSWORD_BUTTONS_CONFIG = {
  edit: {
    classes: [...PROFILE_CLASSES.baseButton, ...PROFILE_CLASSES.buttonEdit],
    events: {
      click: async () => {
        passwordEmitter.emit('editBtnClick');
      },
    },
    text: 'Edit',
  },
  save: {
    attributes: {
      disabled: 'true',
    },
    classes: [...PROFILE_CLASSES.baseButton, ...PROFILE_CLASSES.buttonSave],
    events: {
      click: async () => {
        try {
          const isFormValid = validateDataForm(passwordState);

          if (!isFormValid) {
            createPopupMessage('Please enter valid password', false);
            return;
          }

          await passwordEmitterAsync.emit('updatePassword');
          passwordEmitter.emit('saveBtnClick');
          createPopupMessage('Your password has been successfully saved', true);
        } catch (error) {
          if (error instanceof Error) {
            createPopupMessage(error.message, false);
            return;
          }
          createPopupMessage('Unexpected error during saving password', false);
        }
      },
    },
    text: 'Save',
  },
  cancel: {
    attributes: {
      disabled: 'true',
    },
    classes: [...PROFILE_CLASSES.baseButton, ...PROFILE_CLASSES.buttonCancel],
    events: {
      click: () => {
        passwordEmitter.emit('cancelBtnClick');
      },
    },
    text: 'Cancel',
  },
};
