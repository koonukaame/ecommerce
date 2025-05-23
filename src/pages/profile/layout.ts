import { container } from '../../shared/components/container';
import { getUserInfo } from '../../app/api';
import { getAuthToken } from '../../app/ecommerce/get-auth-token';
import type { FetchError } from '../../app/types';
import { activateButtonEmitter } from '../../helpers/buttons-emitter';
import { createWrappedInput } from '../../shared/components/input';
import { HEADER2 } from '../../shared/styles';
import { createButton, createDiv, createH2 } from '../../utils/create-elements/create-tags';
import { BUTTONS_CONFIG, PROFILE_CLASSES, PROFILE_CONFIG } from './constants';

export async function ProfilePage(): Promise<HTMLElement | FetchError> {
  //! Delete in the future when I save token in local/session storage
  const token = await getAuthToken('ivanIvanov@yandex.ru', 'Ivan12345');

  if (typeof token !== 'string') {
    return { message: 'Failed to get token' };
  }

  const user = await getUserInfo(token);

  if (!('id' in user)) {
    return { message: 'Failed to get Personal Data' };
  }

  // updatePersonalDataState(user.firstName, user.lastName, user.dateOfBirth)

  const title = createH2({ classes: HEADER2.general, text: 'Personal Profile' });

  const personalInfoSection = createDiv({ classes: PROFILE_CLASSES.personalInfoSection });

  const firstNameInput = createWrappedInput(PROFILE_CONFIG.firstname);
  firstNameInput.input.value = user.firstName || 'undefined';

  const lastNameInput = createWrappedInput(PROFILE_CONFIG.lastname);
  lastNameInput.input.value = user.lastName || 'undefined';

  const birthDateInput = createWrappedInput(PROFILE_CONFIG.birthdate);
  birthDateInput.input.value = user.dateOfBirth || 'undefined';

  const editButton = createButton(BUTTONS_CONFIG.edit);
  const saveButton = createButton(BUTTONS_CONFIG.save);
  const cancelButton = createButton(BUTTONS_CONFIG.cancel);

  activateButtonEmitter(
    editButton,
    saveButton,
    cancelButton,
    firstNameInput.input,
    lastNameInput.input,
    birthDateInput.input,
  );

  personalInfoSection.append(
    firstNameInput.container,
    lastNameInput.container,
    birthDateInput.container,
    editButton,
    saveButton,
    cancelButton,
  );

  const wrapper = createDiv({ classes: PROFILE_CLASSES.wrapper, children: [title, personalInfoSection] });

  container.append(wrapper);
  return container;
}
