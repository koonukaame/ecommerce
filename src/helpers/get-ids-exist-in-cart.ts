import { getOrCreateCart } from '../app/api/get-or-create-cart';
import { isFetchError } from '../utils/type-guards/is-fetch-error';

export async function getProductIdsExistInCart(): Promise<string[] | void> {
  const cart = await getOrCreateCart();

  if (isFetchError(cart)) {
    return;
  }

  const result = cart.lineItems.map((product) => product.productId);

  return result;
}
