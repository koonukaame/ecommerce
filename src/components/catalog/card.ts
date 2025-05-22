import { createDiv } from '../../utils/create-elements/create-tags';

export function createProductCard(): HTMLDivElement {
  const card = createDiv({ text: 'hello world' });

  return card;
}
