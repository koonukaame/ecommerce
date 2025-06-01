import type { FetchError } from '../../../app/types';
import { activateButtonEmitter, personalInfoEmitter } from '../../../helpers/buttons-emitter';
import { createWrappedInput } from '../../../shared/components/input';
import { createButton, createDiv } from '../../../utils/create-elements/create-tags';
import { PROFILE_CLASSES } from '../constants';
import { updateProfilDataState } from '../../../utils/update-profile-data-state';
import { updatePersonalDataEmitter } from '../../../helpers/update-personal-data-emitter';
import { PROFILE_BUTTONS_CONFIG, PROFILE_CONFIG } from './constants';
import { getAuthorizedUser } from '../../../helpers/get-authorized-user';

export async function createPersonalInfoSection(): Promise<FetchError | HTMLDivElement> {
  const user = await getAuthorizedUser();

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

  const editButton = createButton(PROFILE_BUTTONS_CONFIG.edit);
  const saveButton = createButton(PROFILE_BUTTONS_CONFIG.save);
  const cancelButton = createButton(PROFILE_BUTTONS_CONFIG.cancel);

  const buttons = [editButton, saveButton, cancelButton];

  const inputWrappers = [firstNameWrapper, lastNameWrapper, birthDateWrapper, emailWrapper];
  const inputContainers = inputWrappers.map((inputWrapper) => inputWrapper.container);
  const inputs = inputWrappers.map((inputWrapper) => inputWrapper.input);

  activateButtonEmitter(personalInfoEmitter, buttons, inputWrappers);
  updatePersonalDataEmitter(inputs);

  const personalInfoSection = createDiv({
    classes: PROFILE_CLASSES.section,
    children: [...inputContainers, ...buttons],
  });

  return personalInfoSection;
}
