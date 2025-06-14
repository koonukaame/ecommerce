import { createDiv } from '../../utils/create-elements/create-tags';
import { CART } from '../../pages/cart/constants';
import { createProductsWrapper } from './items-wrapper';
import { createPromocodeComponent } from './promocode/promocode';

export function cartLayout(): HTMLDivElement {
  const layout = createDiv({ classes: CART.wrapper });

  createProductsWrapper(layout);

  createPromocodeComponent(layout);

  return layout;
}
