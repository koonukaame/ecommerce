import { createDiv } from '../../utils/create-elements/create-tags';
import { CART } from '../../pages/cart/constants';
import { CustomEventEmitter } from '../../utils/event-emitter';
import { renderCartItems } from '../../utils/render-cart/render-cart';

export const cartEventEmitter = new CustomEventEmitter();

export async function createProductsWrapper(layout: HTMLDivElement): Promise<HTMLDivElement> {
  const itemsWrapper = createDiv({ parent: layout, classes: CART.itemsWrapper });

  cartEventEmitter.subscribe('item-delete', () => {
    renderCartItems(itemsWrapper);
  });

  renderCartItems(itemsWrapper);

  return itemsWrapper;
}
