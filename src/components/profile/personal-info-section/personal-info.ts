import { getUserInfo } from '../../../app/api';
import { getAuthToken } from '../../../app/ecommerce/get-auth-token';
import type { FetchError } from '../../../app/types';
import { activateButtonEmitter, personalInfoEmitter } from '../../../helpers/buttons-emitter';
import { createWrappedInput } from '../../../shared/components/input';
import { createButton, createDiv } from '../../../utils/create-elements/create-tags';
import { BUTTONS_CONFIG, PROFILE_CLASSES, PROFILE_CONFIG } from '../../../pages/profile/constants';
import { updateProfilDataState } from '../../../utils/update-profile-data-state';
import { updatePersonalDataEmitter } from '../../../helpers/update-personal-data-emitter';

export async function createPersonalInfoSection(): Promise<FetchError | HTMLDivElement> {
  //! Delete in the future when I save token in local/session storage
  const token = await getAuthToken('ivanIvanov@yandex.ru', 'Ivan12345');

  if (typeof token !== 'string') {
    return { message: 'Failed to get token' };
  }

  const user = await getUserInfo(token);

  if (!('id' in user)) {
    return { message: 'Failed to get Personal Data' };
  }

  updateProfilDataState(user);

  const firstNameWrapper = createWrappedInput(PROFILE_CONFIG.firstname);
  const lastNameWrapper = createWrappedInput(PROFILE_CONFIG.lastname);
  const birthDateWrapper = createWrappedInput(PROFILE_CONFIG.birthdate);
  const emailWrapper = createWrappedInput(PROFILE_CONFIG.email);

  firstNameWrapper.input.value = user.firstName || 'undefined';
  lastNameWrapper.input.value = user.lastName || 'undefined';
  birthDateWrapper.input.value = user.dateOfBirth || 'undefined';
  emailWrapper.input.value = user.email || 'undefined';

  const editButton = createButton(BUTTONS_CONFIG.edit);
  const saveButton = createButton(BUTTONS_CONFIG.save);
  const cancelButton = createButton(BUTTONS_CONFIG.cancel);

  const buttons = [editButton, saveButton, cancelButton];

  const inputWrappers = [firstNameWrapper, lastNameWrapper, birthDateWrapper, emailWrapper];
  const inputContainers = inputWrappers.map((inputWrapper) => inputWrapper.container);
  const inputs = inputWrappers.map((inputWrapper) => inputWrapper.input);

  activateButtonEmitter(personalInfoEmitter, buttons, inputWrappers);
  updatePersonalDataEmitter(inputs);

  const personalInfoSection = createDiv({
    classes: PROFILE_CLASSES.section,
    children: [...inputContainers, editButton, saveButton, cancelButton],
  });

  return personalInfoSection;
}
