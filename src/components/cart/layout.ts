import { createDiv } from '../../utils/create-elements/create-tags';
import { CART } from '../../pages/cart/constants';
import { createProductsWrapper } from './items-wrapper';

export function cartLayout(): HTMLDivElement {
  const layout = createDiv({ classes: CART.wrapper });

  createProductsWrapper(layout);

  return layout;
}
