import { registrationState } from '../../app/state/registration';

export function validateLoginForm(): boolean {
  if (!(registrationState.email.error || registrationState.password.error)) {
    return true;
  }

  return false;
}
