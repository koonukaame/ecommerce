import { CARD } from '../pages/catalog/constants';
import { FULL_PERCENT } from '../shared/constants';
import { createDiv } from '../utils/create-elements/create-tags';

export function discountMark(wrapper: HTMLDivElement, originalPrice: number, discountedPrice?: number): void {
  if (!discountedPrice) {
    return;
  }

  const discountPercent = Math.round(FULL_PERCENT - (discountedPrice / originalPrice) * FULL_PERCENT);

  if (discountPercent > 0) {
    createDiv({
      text: `-${discountPercent}%`,
      classes: CARD.discountPercent,
      parent: wrapper,
    });
  }
}
