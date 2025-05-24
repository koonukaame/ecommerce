import { getUserInfo } from '../../../app/api';
import { getAuthToken } from '../../../app/ecommerce/get-auth-token';
import { profileDataState } from '../../../app/state/profile/profile-state';
import type { FetchError } from '../../../app/types';
import { activateButtonEmitter, updatePersonalDataEmitter } from '../../../helpers/buttons-emitter';
import { createWrappedInput } from '../../../shared/components/input';
import { createButton, createDiv } from '../../../utils/create-elements/create-tags';
import { BUTTONS_CONFIG, PROFILE_CLASSES, PROFILE_CONFIG } from '../constants';

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

  const personalInfoSection = createDiv({ classes: PROFILE_CLASSES.personalInfoSection });

  profileDataState.firstName.value = user.firstName || '';
  profileDataState.lastName.value = user.lastName || '';
  profileDataState.dateOfBirth.value = user.dateOfBirth || '';

  profileDataState.firstName.error = false;
  profileDataState.lastName.error = false;
  profileDataState.dateOfBirth.error = false;

  const firstNameInput = createWrappedInput(PROFILE_CONFIG.firstname);
  firstNameInput.input.value = user.firstName || 'undefined';

  const lastNameInput = createWrappedInput(PROFILE_CONFIG.lastname);
  lastNameInput.input.value = user.lastName || 'undefined';

  const birthDateInput = createWrappedInput(PROFILE_CONFIG.birthdate);
  birthDateInput.input.value = user.dateOfBirth || 'undefined';

  const editButton = createButton(BUTTONS_CONFIG.edit);
  const saveButton = createButton(BUTTONS_CONFIG.save);
  const cancelButton = createButton(BUTTONS_CONFIG.cancel);

  activateButtonEmitter(editButton, saveButton, cancelButton, firstNameInput, lastNameInput, birthDateInput);

  updatePersonalDataEmitter(firstNameInput.input, lastNameInput.input, birthDateInput.input);

  personalInfoSection.append(
    firstNameInput.container,
    lastNameInput.container,
    birthDateInput.container,
    editButton,
    saveButton,
    cancelButton,
  );

  return personalInfoSection;
}
