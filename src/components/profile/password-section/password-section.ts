import type { FetchError } from '../../../app/types';
import { activateButtonEmitter, passwordEmitter } from '../../../helpers/buttons-emitter';
import { getAuthorizedUser } from '../../../helpers/get-authorized-user';
import { updatePasswordEmitter } from '../../../helpers/update-personal-data-emitter';
import { createWrappedInput } from '../../../shared/components/input';
import { createButton, createDiv } from '../../../utils/create-elements/create-tags';
import { PROFILE_CLASSES } from '../constants';
import { PASSWORD_BUTTONS_CONFIG, PASSWORD_CONFIG } from './constants';

export async function createPasswordSection(): Promise<FetchError | HTMLDivElement> {
  const user = await getAuthorizedUser();

  if (!('id' in user)) {
    return { message: 'Failed to get Personal Data' };
  }

  const currentPasswordWrapper = createWrappedInput(PASSWORD_CONFIG.currentPassword);
  const newPasswordWrapper = createWrappedInput(PASSWORD_CONFIG.newPassword);

  const editButton = createButton(PASSWORD_BUTTONS_CONFIG.edit);
  const saveButton = createButton(PASSWORD_BUTTONS_CONFIG.save);
  const cancelButton = createButton(PASSWORD_BUTTONS_CONFIG.cancel);

  const buttons = [editButton, saveButton, cancelButton];

  const inputWrappers = [currentPasswordWrapper, newPasswordWrapper];
  const inputContainers = inputWrappers.map((inputWrapper) => inputWrapper.container);
  const inputs = inputWrappers.map((inputWrapper) => inputWrapper.input);

  activateButtonEmitter(passwordEmitter, buttons, inputWrappers);
  updatePasswordEmitter(inputs);

  const personalInfoSection = createDiv({
    classes: PROFILE_CLASSES.section,
    children: [...inputContainers, ...buttons],
  });

  return personalInfoSection;
}
