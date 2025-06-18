import { defaultShippingState } from '../app/state/profile/default-shipping-state';
import { optionalBillingState } from '../app/state/profile/optional-billing-state';
import { optionalShippingState } from '../app/state/profile/optional-shipping-state';
import { profileDataState } from '../app/state/profile/profile-state';
import type { FetchError, ProfileDataState } from '../app/types';
import { getAuthorizedUser } from './get-authorized-user';

function resetState(state: ProfileDataState): void {
  for (const value of Object.values(state)) {
    value.error = false;
  }
}

export async function resetInputDisplayFromServer(inputs: HTMLInputElement[]): Promise<FetchError | void> {
  const user = await getAuthorizedUser();

  if (!('id' in user)) {
    return { message: 'Failed to get Personal Info' };
  }

  const [firstNameInput, lastNameInput, birthDateInput, emailInput] = inputs;

  firstNameInput.value = user.firstName || '';
  lastNameInput.value = user.lastName || '';
  birthDateInput.value = user.dateOfBirth || '';
  emailInput.value = user.email || '';

  resetState(profileDataState);
}

export async function resetDefaultAddressInputFromServer(
  inputs: HTMLInputElement[],
  select: HTMLSelectElement,
  type: 'shipping' | 'billing',
): Promise<FetchError | void> {
  const user = await getAuthorizedUser();

  if (!('id' in user)) {
    return { message: 'Failed to get Personal Info' };
  }

  const [cityInput, streetInput, postalCodeInput] = inputs;
  const addresses = user.addresses;

  const defaultId = type === 'shipping' ? user.defaultShippingAddressId : user.defaultBillingAddressId;

  const address = addresses.find((address) => address.id === defaultId);

  select.value = address?.country || '';
  cityInput.value = address?.city || '';
  streetInput.value = address?.streetName || '';
  postalCodeInput.value = address?.postalCode || '';

  if (type === 'shipping') {
    resetState(defaultShippingState);
  } else {
    resetState(defaultShippingState);
  }
}

export async function resetOptionalAddressInputFromServer(
  inputs: HTMLInputElement[],
  select: HTMLSelectElement,
  type: 'optional-shipping' | 'optional-billing',
): Promise<FetchError | void> {
  const user = await getAuthorizedUser();

  if (!('id' in user)) {
    return { message: 'Failed to get Personal Info' };
  }

  const [cityInput, streetInput, postalCodeInput] = inputs;

  const addresses = type === 'optional-shipping' ? user.shippingAddressIds : user.billingAddressIds;

  if (!addresses) {
    return;
  }

  const optionalAddressID = addresses.find(
    (address) => address !== user.defaultShippingAddressId && address !== user.defaultBillingAddressId,
  );
  const optionalAddress = user.addresses.find((address) => address.id === optionalAddressID);

  select.value = optionalAddress?.country || '';
  cityInput.value = optionalAddress?.city || '';
  streetInput.value = optionalAddress?.streetName || '';
  postalCodeInput.value = optionalAddress?.postalCode || '';

  if (type === 'optional-shipping') {
    resetState(optionalShippingState);
  } else {
    resetState(optionalBillingState);
  }
}
