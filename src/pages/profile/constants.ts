import { dateOfBirthValidation, inputValidation } from '../../utils/validation/profile/input-validation';
import { ERROR_MESSAGES, REGEX } from '../../shared/constants';
import { buttonEmitter } from '../../helpers/buttons-emitter';

export const PROFILE_CLASSES = {
  baseButton: ['w-20', 'h-10', 'text-lg', 'text-white', 'rounded', 'absolute', 'bg-blue-200'],
  buttonEdit: ['cursor-pointer', 'top-1', 'right-1', 'bg-blue-600'],
  buttonSave: ['block', 'bottom-1', 'left-3'],
  buttonCancel: ['block', 'bottom-1', 'left-25'],
  personalInfoSection: ['relative', 'w-full', 'h-[310px]', 'border', 'border-black', 'pl-[10px]', 'text-[15px]'],
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
  ],
  input: ['mt-5', 'border', 'border-gray-300', 'rounded', 'p-2', 'bg-gray-100', 'text-gray-500'],
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
};

export const BUTTONS_CONFIG = {
  edit: {
    classes: [...PROFILE_CLASSES.baseButton, ...PROFILE_CLASSES.buttonEdit],
    events: {
      click: async () => {
        buttonEmitter.emit('editBtnClick');
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
      click: () => {
        buttonEmitter.emit('saveBtnClick');
        buttonEmitter.emit('updateUserData');

        // const isFormValid: boolean = validateLoginForm();

        // if (!isFormValid) {
        //   return;
        // }

        // const { email, password } = registrationState;

        // try {
        //   const response = await loginUser(email.value, password.value);

        //   if ('id' in response) {
        //     createPopupMessage(`Welcome back, ${response.firstName}!`, true);
        //     return;
        //   }

        //   const message = response.message;

        //   createPopupMessage(message, false);
        // } catch {
        //   createPopupMessage('Failed to update Personal Data', false);
        // }
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
      click: () => buttonEmitter.emit('cancelBtnClick'),
    },
    text: 'Cancel',
  },
};
