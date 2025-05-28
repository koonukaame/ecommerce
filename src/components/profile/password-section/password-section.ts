import { getUserInfo } from '../../../app/api';
import { getAuthToken } from '../../../app/ecommerce/get-auth-token';
import type { FetchError } from '../../../app/types';
import { activateButtonEmitter, passwordEmitter } from '../../../helpers/buttons-emitter';
import { PASSWORD_BUTTONS_CONFIG, PROFILE_CLASSES, PROFILE_CONFIG } from '../../../pages/profile/constants';
import { createWrappedInput } from '../../../shared/components/input';
import { createButton, createDiv } from '../../../utils/create-elements/create-tags';

export async function createPasswordSection(): Promise<FetchError | HTMLDivElement> {
  //! Delete in the future when I save token in local/session storage
  const token = await getAuthToken('ivanIvanov@yandex.ru', 'Ivan12345');

  if (typeof token !== 'string') {
    return { message: 'Failed to get token' };
  }

  const user = await getUserInfo(token);

  if (!('id' in user)) {
    return { message: 'Failed to get Personal Data' };
  }

  const currentPasswordWrapper = createWrappedInput(PROFILE_CONFIG.currentPassword);
  const newPasswordWrapper = createWrappedInput(PROFILE_CONFIG.newPassword);

  const editButton = createButton(PASSWORD_BUTTONS_CONFIG.edit);
  const saveButton = createButton(PASSWORD_BUTTONS_CONFIG.save);
  const cancelButton = createButton(PASSWORD_BUTTONS_CONFIG.cancel);

  const inputWrappers = [currentPasswordWrapper, newPasswordWrapper];
  const inputContainers = inputWrappers.map((inputWrapper) => inputWrapper.container);
  const buttons = [editButton, saveButton, cancelButton];

  activateButtonEmitter(passwordEmitter, buttons, inputWrappers);

  const personalInfoSection = createDiv({
    classes: PROFILE_CLASSES.section,
    children: [...inputContainers, editButton, saveButton, cancelButton],
  });

  return personalInfoSection;
}
