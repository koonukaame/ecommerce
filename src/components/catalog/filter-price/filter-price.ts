import { createDiv, createLabel } from '../../../utils/create-elements/create-tags';
import { queryState } from '../../../app/state/query-state';
import { getRangePrices } from '../../../utils/products-fetch/price-range';
import { createPriceRange } from './price-slider';
import { PRICE_FILTER } from '../../../pages/catalog/constants';

export function createPriceFilter(parent: HTMLDivElement): HTMLDivElement {
  const wrapper = createDiv({
    classes: PRICE_FILTER.priceFilterWrapper,
    parent,
  });

  createLabel({ text: 'Filter by Price:', parent: wrapper });

  getRangePrices().then(({ min, max }) => {
    queryState.filter.price.min = String(min);
    queryState.filter.price.max = String(max);

    const rangeWrapper = createDiv({
      classes: PRICE_FILTER.rangeWrapper,
      parent: wrapper,
    });

    const minValue = createDiv({ text: `${min}`, classes: [...PRICE_FILTER.price, ...PRICE_FILTER.minPrice] });
    const maxValue = createDiv({ text: `${max}`, classes: [...PRICE_FILTER.price, ...PRICE_FILTER.maxPrice] });

    createPriceRange(rangeWrapper, min, max);

    createDiv({
      classes: PRICE_FILTER.rangeEls,
      parent: wrapper,
      children: [minValue, rangeWrapper, maxValue],
    });
  });

  return wrapper;
}
