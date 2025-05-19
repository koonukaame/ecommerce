import type { FieldState } from '../app/types';
import type { WrappedInput } from '../shared/components/input';

import { isSameAddress, registrationState } from '../app/state/input-state';
import { CustomEventEmitter } from '../utils/event-emitter';

export const sameAddressEmitter = new CustomEventEmitter();

export function defaultCheckboxSubscribe(
  defaultBillingAddress: HTMLInputElement,
  defaultShippingAddress: HTMLInputElement,
): void {
  sameAddressEmitter.subscribe('sameAddress', (isSame) => {
    if (typeof isSame !== 'boolean') {
      return;
    }
    defaultBillingAddress.checked = defaultShippingAddress.checked;

    defaultShippingAddress.addEventListener('change', () => {
      if (isSameAddress.value) {
        defaultBillingAddress.checked = defaultShippingAddress.checked;
      }
    });
  });
}

export function emitAddressInputs(
  cityInput: WrappedInput,
  postalCodeInput: WrappedInput,
  streetInput: WrappedInput,
  countriesSelect: HTMLSelectElement,
  addressType: 'billing' | 'shipping',
): void {
  if (addressType === 'shipping') {
    streetInput.input.addEventListener('input', (event) => emitFieldChange(event, 'syncStreet'));
    cityInput.input.addEventListener('input', (event) => emitFieldChange(event, 'syncCity'));
    postalCodeInput.input.addEventListener('input', (event) => emitFieldChange(event, 'syncPostalCode'));
    countriesSelect.addEventListener('input', (event) => emitFieldChange(event, 'syncCountry'));
  }
}

export function subscribeToAddressInputs(
  cityInput: WrappedInput,
  postalCodeInput: WrappedInput,
  streetInput: WrappedInput,
  countriesSelect: HTMLSelectElement,
  addressType: 'billing' | 'shipping',
): void {
  sameAddressEmitter.subscribe('sameAddress', (isSame) => {
    if (typeof isSame !== 'boolean') {
      return;
    }
    isSameAddress.value = isSame;
    if (isSame && addressType === 'billing') {
      cityInput.input.value = registrationState.shippingCity.rawValue;
      postalCodeInput.input.value = registrationState.shippingPostalCode.rawValue;
      streetInput.input.value = registrationState.shippingStreet.rawValue;
      countriesSelect.value = registrationState.shippingCountry.value;

      registrationState.billingCity = { ...registrationState.shippingCity };
      registrationState.billingPostalCode = { ...registrationState.shippingPostalCode };
      registrationState.billingStreet = { ...registrationState.shippingStreet };
      registrationState.billingCountry = { ...registrationState.shippingCountry };

      cityInput.errorContainer.textContent = '';
      postalCodeInput.errorContainer.textContent = '';
      streetInput.errorContainer.textContent = '';
    }
  });

  if (addressType === 'billing') {
    syncInputValue('syncStreet', registrationState.billingStreet, streetInput);
    syncInputValue('syncCity', registrationState.billingCity, cityInput);
    syncInputValue('syncPostalCode', registrationState.billingPostalCode, postalCodeInput);
    syncInputValue('syncCountry', registrationState.billingCountry, countriesSelect);
  }
}

export function validateInputValue(value: string, pattern: RegExp): { isValid: boolean } {
  return { isValid: pattern.test(value.trim()) };
}

import { REGEX } from '../shared/constants';

function emitFieldChange(event: Event, eventName: string): void {
  const target = event.target;
  if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement) {
    sameAddressEmitter.emit(eventName, target.value);
  } else {
    throw new TypeError('Input is not an HTMLInputElement or HTMLSelectElement');
  }
}

function syncInputValue(eventName: string, fieldState: FieldState, input: HTMLSelectElement | WrappedInput): void {
  sameAddressEmitter.subscribe(eventName, (value: unknown) => {
    if (typeof value !== 'string' || !isSameAddress.value) {
      return;
    }

    if (input instanceof HTMLSelectElement) {
      input.value = value;
      fieldState.rawValue = fieldState.value = value;
      return;
    }

    input.input.value = value;
    const name = input.input.name;

    switch (name) {
      case 'billingCity': {
        const { isValid } = validateInputValue(value, REGEX.GENERAL);
        fieldState.value = isValid ? value : fieldState.value;
        fieldState.error = !isValid;
        break;
      }
      case 'billingPostalCode': {
        const { isValid } = validateInputValue(value, REGEX.POSTAL_CODE);
        fieldState.value = isValid ? value : fieldState.value;
        fieldState.error = !isValid;
        break;
      }
      case 'billingStreet': {
        const { isValid } = validateInputValue(value, REGEX.STREET);
        fieldState.value = isValid ? value : fieldState.value;
        fieldState.error = !isValid;
        break;
      }
      default: {
        fieldState.error = false;
        break;
      }
    }

    fieldState.rawValue = value;
  });
}
