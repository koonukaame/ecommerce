import type { ProfileDataState } from '../../../app/types';

export function validateDataForm(state: ProfileDataState): boolean {
  console.log('STATE:', state);
  const isFormValid = Object.values(state).every((value) => value.error === false);

  return isFormValid;
}
