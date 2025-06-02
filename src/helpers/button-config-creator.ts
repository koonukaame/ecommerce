import { PROFILE_CLASSES } from '../components/profile/constants';

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
  onRemove?: () => void;
};

type ButtonsConfig = {
  edit: ButtonConfig;
  save: ButtonConfig;
  cancel: ButtonConfig;
  remove?: ButtonConfig;
};

export function createButtonsConfig(
  { onEdit, onSave, onCancel, onRemove }: ButtonParameters,
  customClasses: Partial<Record<keyof ButtonsConfig, string[]>> = {},
): ButtonsConfig {
  const config: ButtonsConfig = {
    edit: {
      classes: [...PROFILE_CLASSES.baseButton, ...(customClasses.edit ?? PROFILE_CLASSES.buttonEdit)],
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

  if (onRemove) {
    config.remove = {
      attributes: { disabled: 'true' },
      classes: [...PROFILE_CLASSES.baseButton, ...PROFILE_CLASSES.buttonAddressRemove],
      events: { click: onRemove },
      text: 'Remove',
    };
  }

  return config;
}
