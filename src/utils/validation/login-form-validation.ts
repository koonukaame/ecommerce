import { loginState } from '../../app/state/login';

export function validateLoginForm(): boolean {
  const isFormValid = Object.values(loginState).every((value) => value.error === false);

  console.log('Form validation', loginState);
  console.log('Is form valid?', isFormValid);

  return isFormValid;
}
