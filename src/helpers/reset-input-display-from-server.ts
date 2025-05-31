import { getUserInfo } from '../app/api';
import { getAuthToken } from '../app/ecommerce/get-auth-token';
import type { FetchError } from '../app/types';

export async function resetInputDisplayFromServer(inputs: HTMLInputElement[]): Promise<FetchError | void> {
  //! Delete in the future when I save token in local/session storage
  const token = await getAuthToken('ivanIvanov@yandex.ru', 'Ivan12345');

  if (typeof token !== 'string') {
    return { message: 'Failed to get token' };
  }

  const user = await getUserInfo(token);
  if (!('id' in user)) {
    return { message: 'Failed to get Personal Info' };
  }

  const [firstNameInput, lastNameInput, birthDateInput, emailInput] = inputs;

  firstNameInput.value = user.firstName || '';
  lastNameInput.value = user.lastName || '';
  birthDateInput.value = user.dateOfBirth || '';
  emailInput.value = user.email || '';
}

export async function resetShippingAddressInputFromServer(
  inputs: HTMLInputElement[],
  select: HTMLSelectElement,
): Promise<FetchError | void> {
  //! Delete in the future when I save token in local/session storage
  const token = await getAuthToken('ivanIvanov@yandex.ru', 'Ivan12345');

  if (typeof token !== 'string') {
    return { message: 'Failed to get token' };
  }

  const user = await getUserInfo(token);
  if (!('id' in user)) {
    return { message: 'Failed to get Personal Info' };
  }

  const [cityInput, streetInput, postalCodeInput] = inputs;
  const addresses = user.addresses;

  const address = addresses.find((add) => add.id === user.defaultShippingAddressId);

  select.value = address?.country || '';
  cityInput.value = address?.city || '';
  streetInput.value = address?.streetName || '';
  postalCodeInput.value = address?.postalCode || '';
}

export async function resetBillingAddressInputFromServer(
  inputs: HTMLInputElement[],
  select: HTMLSelectElement,
): Promise<FetchError | void> {
  //! Delete in the future when I save token in local/session storage
  const token = await getAuthToken('ivanIvanov@yandex.ru', 'Ivan12345');

  if (typeof token !== 'string') {
    return { message: 'Failed to get token' };
  }

  const user = await getUserInfo(token);
  if (!('id' in user)) {
    return { message: 'Failed to get Personal Info' };
  }

  const [cityInput, streetInput, postalCodeInput] = inputs;
  const addresses = user.addresses;

  const address = addresses.find((add) => add.id === user.defaultBillingAddressId);

  select.value = address?.country || '';
  cityInput.value = address?.city || '';
  streetInput.value = address?.streetName || '';
  postalCodeInput.value = address?.postalCode || '';
}
