import { createDiv } from '../../utils/create-elements/create-tags';
import { CART } from '../../pages/cart/constants';
import { CustomEventEmitter } from '../../utils/event-emitter';
import { renderCartItems } from '../../utils/render-cart/render-cart';

export const cartEventEmitter = new CustomEventEmitter();

export function createProductsWrapper(layout: HTMLDivElement): HTMLDivElement {
  const itemsWrapper = createDiv({ parent: layout, classes: CART.itemsWrapper });

  cartEventEmitter.subscribe('item-change', () => {
    renderCartItems(itemsWrapper);
  });

  renderCartItems(itemsWrapper);

  return itemsWrapper;
}
