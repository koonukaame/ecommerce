import { isSameAddress, registrationState } from '../app/state/input-state';

export function resetState(): void {
  isSameAddress.value = false;

  const excludedKeys = new Set(['billingCountry', 'shippingCountry']);
  const stateKeys = Object.keys(registrationState).filter((key) => !excludedKeys.has(key));

  for (const key of stateKeys) {
    registrationState[key] = { error: false, rawValue: '', value: '' };
  }

  for (const key of excludedKeys) {
    registrationState[key] = { error: false, rawValue: '', value: 'RU' };
  }
}
