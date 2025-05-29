import { PROFILE_CLASSES } from '../pages/profile/constants';

type ButtonConfig = {
  classes: string[];
  text: string;
  events: {
    click: () => void | Promise<void>;
  };
  attributes?: Record<'disabled', 'true'>;
};

type ButtonParameters = {
  onEdit: () => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
};

type ButtonsConfig = {
  edit: ButtonConfig;
  save: ButtonConfig;
  cancel: ButtonConfig;
};

export function createButtonsConfig({ onEdit, onSave, onCancel }: ButtonParameters): ButtonsConfig {
  return {
    edit: {
      classes: [...PROFILE_CLASSES.baseButton, ...PROFILE_CLASSES.buttonEdit],
      events: { click: onEdit },
      text: 'Edit',
    },
    save: {
      attributes: { disabled: 'true' },
      classes: [...PROFILE_CLASSES.baseButton, ...PROFILE_CLASSES.buttonSave],
      events: { click: onSave },
      text: 'Save',
    },
    cancel: {
      attributes: { disabled: 'true' },
      classes: [...PROFILE_CLASSES.baseButton, ...PROFILE_CLASSES.buttonCancel],
      events: { click: onCancel },
      text: 'Cancel',
    },
  };
}
