import { createDiv } from '../../utils/create-elements/create-tags';
import { createCartItem } from './item';

export function cartLayout(): HTMLDivElement {
  const layout = createDiv({ classes: ['flex', 'w-full', 'flex-col'] });

  createCartItem(layout);

  return layout;
}
