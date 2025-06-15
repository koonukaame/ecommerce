import { createDiv, createSpan } from '../../utils/create-elements/create-tags';
import { CART } from '../../pages/cart/constants';
import { createProductsWrapper } from './items-wrapper';
import { createTotalCostEmitter } from '../../helpers/total-cost-emitter';

export function cartLayout(): HTMLDivElement {
  const layout = createDiv({ classes: CART.wrapper });

  createProductsWrapper(layout);

  const totalCost = createSpan({
    classes: ['text-xl'],
    parent: layout,
  });

  createTotalCostEmitter(totalCost);

  return layout;
}
