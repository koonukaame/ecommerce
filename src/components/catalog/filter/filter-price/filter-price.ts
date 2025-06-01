import { createDiv } from '../../../../utils/create-elements/create-tags';
import { queryState } from '../../../../app/state/query-state';
import { getRangePrices } from '../../../../utils/fetch/fetch-prices';
import { createPriceRange } from './price-range';
import { PRICE_FILTER } from '../../../../pages/catalog/constants';

export function createPriceFilter(): HTMLDivElement {
  const wrapper = createDiv({
    classes: PRICE_FILTER.priceFilterWrapper,
  });

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
