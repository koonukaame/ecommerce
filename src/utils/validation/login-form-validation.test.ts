import { describe, expect, it } from 'vitest';

import { registrationState } from '../../app/state/input-state';
import { validateLoginForm } from './login-form-validation';

describe('validation login form', () => {
  it('return false if form is invalid', () => {
    Object.assign(registrationState, {
      email: { error: true, value: 'wrrong email' },
      password: { error: true, value: 'wrong password' },
    });

    const result = validateLoginForm();

    expect(result).toBe(false);
  });

  it('return true if form is valid', () => {
    Object.assign(registrationState, {
      email: { error: false, value: 'alex@alex.ru' },
      password: { error: false, value: 'alex' },
    });

    const result = validateLoginForm();

    expect(result).toBe(true);
  });
});
