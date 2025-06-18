import type { Cart } from '@commercetools/platform-sdk';
import type { FetchError } from '../app/types';

import { basket } from '../components/header/buttons';
import { isFetchError } from './type-guards/is-fetch-error';

export function initCartIndicator(data: Cart | FetchError): void {
  if (isFetchError(data)) {
    return;
  }

  const count = data.lineItems.reduce((acc, item) => acc + item.quantity, 0);

  basket.style.setProperty('--count', `"${count}"`);
}
