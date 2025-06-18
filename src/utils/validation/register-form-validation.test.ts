import { describe, expect, it } from 'vitest';

import { isSameAddress, registrationState } from '../../app/state/input-state';
import { validateRegistrationForm } from './register-form-validation';

const USER_DATA = {
  billingCity: {
    error: false,
    rawValue: '',
    value: 'Moscow',
  },
  billingCountry: {
    error: false,
    rawValue: '',
    value: 'RU',
  },
  billingPostalCode: {
    error: false,
    rawValue: '',
    value: '123456',
  },
  billingStreet: {
    error: false,
    rawValue: '',
    value: 'Red Square',
  },
  dateOfBirth: {
    error: false,
    rawValue: '',
    value: '1990-01-01',
  },
  email: {
    error: false,
    rawValue: '',
    value: 'valid@yandex.ru',
  },
  firstName: {
    error: false,
    rawValue: '',
    value: 'Alexey',
  },
  lastName: {
    error: false,
    rawValue: '',
    value: 'Ivanov',
  },
  password: {
    error: false,
    rawValue: '',
    value: '123456',
  },
  shippingCity: {
    error: false,
    rawValue: '',
    value: 'Saint Petersburg',
  },
  shippingCountry: {
    error: false,
    rawValue: '',
    value: 'RU',
  },
  shippingPostalCode: {
    error: false,
    rawValue: '',
    value: '654321',
  },
  shippingStreet: {
    error: false,
    rawValue: '',
    value: 'Sovetskaya',
  },
};

const USER_DATA_WITHOUT_BILLING = {
  dateOfBirth: {
    error: false,
    rawValue: '',
    value: '1990-01-01',
  },
  email: {
    error: false,
    rawValue: '',
    value: 'valid@yandex.ru',
  },
  firstName: {
    error: false,
    rawValue: '',
    value: 'Alexey',
  },
  lastName: {
    error: false,
    rawValue: '',
    value: 'Ivanov',
  },
  password: {
    error: false,
    rawValue: '',
    value: '123456',
  },
  shippingCity: {
    error: false,
    rawValue: '',
    value: 'Saint Petersburg',
  },
  shippingCountry: {
    error: false,
    rawValue: '',
    value: 'RU',
  },
  shippingPostalCode: {
    error: false,
    rawValue: '',
    value: '654321',
  },
  shippingStreet: {
    error: false,
    rawValue: '',
    value: 'Sovetskaya',
  },
};

describe('validation register form', () => {
  it('return false if form is invalid', () => {
    Object.assign(registrationState, {
      email: {
        error: true,
        value: 'wrong email',
      },
      password: {
        error: true,
        value: 'wrong password',
      },
    });

    const result = validateRegistrationForm();
    expect(result).toBe(false);
  });

  it('return true if form is valid', () => {
    Object.assign(registrationState, USER_DATA);

    const result = validateRegistrationForm();
    expect(result).toBe(true);
  });

  it('reset billing errors if isSameAddress is true', () => {
    isSameAddress.value = true;

    registrationState.billingCity.error = true;
    registrationState.billingCountry.error = true;
    registrationState.billingPostalCode.error = true;
    registrationState.billingStreet.error = true;

    Object.assign(registrationState, USER_DATA_WITHOUT_BILLING);

    const result = validateRegistrationForm();

    expect(registrationState.billingCity.error).toBe(false);
    expect(registrationState.billingCountry.error).toBe(false);
    expect(registrationState.billingPostalCode.error).toBe(false);
    expect(registrationState.billingStreet.error).toBe(false);

    expect(result).toBe(true);
  });
});
