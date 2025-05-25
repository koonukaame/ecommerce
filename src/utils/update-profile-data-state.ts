import type { Customer } from '@commercetools/platform-sdk';
import { profileDataState } from '../app/state/profile/profile-state';

export function updateProfilDataState(user: Customer): void {
  profileDataState.firstName.value = user.firstName || '';
  profileDataState.lastName.value = user.lastName || '';
  profileDataState.dateOfBirth.value = user.dateOfBirth || '';

  profileDataState.firstName.error = false;
  profileDataState.lastName.error = false;
  profileDataState.dateOfBirth.error = false;
}
