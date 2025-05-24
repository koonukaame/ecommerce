import { profileDataState } from '../../../app/state/profile/profile-state';

export function validatePersonalDataForm(): boolean {
  console.log(profileDataState);
  const isFormValid = Object.values(profileDataState).every((value) => value.error === false);

  return isFormValid;
}
