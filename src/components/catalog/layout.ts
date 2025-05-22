import { createProductCard } from './card';
import { createDiv } from '../../utils/create-elements/create-tags';

export function catalogLayout(): HTMLDivElement {
  const cards = createProductCard();

  const layout = createDiv({
    children: [cards],
  });

  return layout;
}
