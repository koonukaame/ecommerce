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

export async function resetDefaultAddressInputFromServer(
  inputs: HTMLInputElement[],
  select: HTMLSelectElement,
  type: 'shipping' | 'billing',
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

  const defaultId = type === 'shipping' ? user.defaultShippingAddressId : user.defaultBillingAddressId;

  const address = addresses.find((address) => address.id === defaultId);

  select.value = address?.country || '';
  cityInput.value = address?.city || '';
  streetInput.value = address?.streetName || '';
  postalCodeInput.value = address?.postalCode || '';
}

export async function resetOptionalAddressInputFromServer(
  inputs: HTMLInputElement[],
  select: HTMLSelectElement,
  type: 'optional-shipping' | 'optional-billing',
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

  const addresses = type === 'optional-shipping' ? user.shippingAddressIds : user.billingAddressIds;

  if (!addresses) {
    return;
  }

  console.log(addresses);
  const optionalAddressID = addresses.find(
    (address) => address !== user.defaultShippingAddressId && address !== user.defaultBillingAddressId,
  );
  const optionalAddress = user.addresses.find((address) => address.id === optionalAddressID);

  select.value = optionalAddress?.country || '';
  cityInput.value = optionalAddress?.city || '';
  streetInput.value = optionalAddress?.streetName || '';
  postalCodeInput.value = optionalAddress?.postalCode || '';
}
