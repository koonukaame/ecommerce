import type { FieldState } from '../app/types';
import type { WrappedInput } from '../shared/components/input';

import { isSameAddress, registrationState } from '../app/state/registration';
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
      countriesSelect.value = registrationState.shippingCountry.rawValue;
    }
  });

  if (addressType === 'billing') {
    syncInputValue('syncStreet', registrationState.billingStreet, streetInput);
    syncInputValue('syncCity', registrationState.billingCity, cityInput);
    syncInputValue('syncPostalCode', registrationState.billingPostalCode, postalCodeInput);
    syncInputValue('syncCountry', registrationState.billingCountry, countriesSelect);
  }
}

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
    } else {
      input.input.value = value;
    }
    fieldState.value = value;
  });
}
