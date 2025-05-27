import { getUserInfo } from '../../../app/api';
import { getAuthToken } from '../../../app/ecommerce/get-auth-token';
import type { FetchError } from '../../../app/types';
import { activateButtonEmitter } from '../../../helpers/buttons-emitter';
import { createWrappedInput } from '../../../shared/components/input';
import { createButton, createDiv } from '../../../utils/create-elements/create-tags';
import { BUTTONS_CONFIG, PROFILE_CLASSES, PROFILE_CONFIG } from '../../../pages/profile/constants';
import { updateProfilDataState } from '../../../utils/update-profile-data-state';
import { updatePersonalDataEmitter } from '../../../helpers/update-personal-data-emitter';

// eslint-disable-next-line max-lines-per-function
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

  const personalInfoSection = createDiv({ classes: PROFILE_CLASSES.section });

  const firstNameInput = createWrappedInput(PROFILE_CONFIG.firstname);
  firstNameInput.input.value = user.firstName || 'undefined';

  const lastNameInput = createWrappedInput(PROFILE_CONFIG.lastname);
  lastNameInput.input.value = user.lastName || 'undefined';

  const birthDateInput = createWrappedInput(PROFILE_CONFIG.birthdate);
  birthDateInput.input.value = user.dateOfBirth || 'undefined';

  const emailInput = createWrappedInput(PROFILE_CONFIG.email);
  emailInput.input.value = user.email || 'undefined';

  const editButton = createButton(BUTTONS_CONFIG.edit);
  const saveButton = createButton(BUTTONS_CONFIG.save);
  const cancelButton = createButton(BUTTONS_CONFIG.cancel);

  activateButtonEmitter(
    editButton,
    saveButton,
    cancelButton,
    firstNameInput,
    lastNameInput,
    birthDateInput,
    emailInput,
  );

  updatePersonalDataEmitter(firstNameInput.input, lastNameInput.input, birthDateInput.input, emailInput.input);

  personalInfoSection.append(
    firstNameInput.container,
    lastNameInput.container,
    birthDateInput.container,
    emailInput.container,
    editButton,
    saveButton,
    cancelButton,
  );

  return personalInfoSection;
}
