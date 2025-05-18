import { registrationState } from '../../app/state/input-state';

export function validateLoginForm(): boolean {
  if (!(registrationState.email.error || registrationState.password.error)) {
    return true;
  }

  return false;
}
