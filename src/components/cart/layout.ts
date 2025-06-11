import { createDiv } from '../../utils/create-elements/create-tags';
import { createCartItem } from './item/item';

export function cartLayout(): HTMLDivElement {
  const layout = createDiv({ classes: ['flex', 'w-full', 'flex-col', 'm-3'] });

  createCartItem(layout);

  return layout;
}
