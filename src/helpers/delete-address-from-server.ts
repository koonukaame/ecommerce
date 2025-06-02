import { getUserInfo } from '../app/api';
import { removeAddressById } from '../app/api/remove-address';
import { getAuthToken } from '../app/ecommerce/get-auth-token';
import { defaultBillingState } from '../app/state/profile/default-billing-state';
import { defaultShippingState } from '../app/state/profile/default-shipping-state';
import { optionalBillingState } from '../app/state/profile/optional-billing-state';
import { optionalShippingState } from '../app/state/profile/optional-shipping-state';
import type { FetchError } from '../app/types';
import { MESSAGES, SERVER_ERROR_MESSAGES } from '../components/profile/constants';
import { createPopupMessage } from '../shared/components/popup';
import { resetStateToDefault } from './reset-state-to-default';

export async function deleteAddressFromServer(
  type: 'shipping' | 'billing' | 'optional-shipping' | 'optional-billing',
): Promise<FetchError | void> {
  try {
    //! Delete in the future when I save token via local/session storage
    const token = await getAuthToken('ivanIvanov@yandex.ru', 'Ivan12345');

    if (typeof token !== 'string') {
      return { message: 'Failed to get token to update Personal Data' };
    }

    const user = await getUserInfo(token);

    if (!('id' in user)) {
      return { message: 'Failed to get User Data' };
    }

    const optionalShippingAddressId = user.shippingAddressIds?.find(
      (address) => address !== user.defaultShippingAddressId,
    );
    const optionalBillingAddressId = user.billingAddressIds?.find(
      (address) => address !== user.defaultBillingAddressId,
    );

    console.log(user.shippingAddressIds, 'и', user.billingAddressIds);
    console.log(optionalShippingAddressId);
    console.log(optionalBillingAddressId);

    const addressID =
      type === 'shipping'
        ? user.defaultShippingAddressId
        : type === 'billing'
          ? user.defaultBillingAddressId
          : type === 'optional-shipping'
            ? optionalShippingAddressId
            : optionalBillingAddressId;

    const state =
      type === 'shipping'
        ? defaultShippingState
        : type === 'billing'
          ? defaultBillingState
          : type === 'optional-shipping'
            ? optionalShippingState
            : optionalBillingState;

    if (addressID) {
      await removeAddressById(addressID, user.version, token);
      createPopupMessage(MESSAGES.ADDRESS_DELETED, true);

      resetStateToDefault(state);
    }
  } catch {
    createPopupMessage(SERVER_ERROR_MESSAGES.ADDRESS_DELETING, false);
  }
}
