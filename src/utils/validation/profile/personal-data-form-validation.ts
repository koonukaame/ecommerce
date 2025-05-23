import { profileDataState } from '../../../app/state/profile/profile-state';

export function validatePersonalDataForm(): boolean {
  const isFormValid = Object.values(profileDataState).every((value) => value.error === false);

  return isFormValid;
}
