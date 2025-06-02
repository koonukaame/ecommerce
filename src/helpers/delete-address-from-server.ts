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

    const optionalShippingId = user.shippingAddressIds?.find((address) => address !== user.defaultShippingAddressId);
    const optionalBillingId = user.billingAddressIds?.find((address) => address !== user.defaultBillingAddressId);

    const addressIDs = {
      shipping: user.defaultShippingAddressId,
      billing: user.defaultBillingAddressId,
      'optional-shipping': optionalShippingId,
      'optional-billing': optionalBillingId,
    };

    const states = {
      shipping: defaultShippingState,
      billing: defaultBillingState,
      'optional-shipping': optionalShippingState,
      'optional-billing': optionalBillingState,
    };

    const addressID = addressIDs[type];
    const state = states[type];

    if (!addressID) {
      return;
    }

    await removeAddressById(addressID, user.version, token);
    createPopupMessage(MESSAGES.ADDRESS_DELETED, true);
    resetStateToDefault(state);
  } catch {
    createPopupMessage(SERVER_ERROR_MESSAGES.ADDRESS_DELETING, false);
  }
}
