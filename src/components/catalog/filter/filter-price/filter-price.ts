import { createDiv } from '../../../../utils/create-elements/create-tags';
import { getRangePrices } from '../../../../utils/fetch/fetch-prices';
import { createPriceRange } from './price-range';
import { PRICE_FILTER } from '../../../../pages/catalog/constants';
import { queryState } from '../../../../app/state/query-state';

export function createPriceFilter(): HTMLDivElement {
  const wrapper = createDiv({
    classes: PRICE_FILTER.priceFilterWrapper,
  });

  getRangePrices().then(() => {
    const rangeWrapper = createDiv({
      classes: PRICE_FILTER.rangeWrapper,
      parent: wrapper,
    });

    const startMin = queryState.filter.price.startMin;
    const startMax = queryState.filter.price.startMax;

    const minValue = createDiv({
      text: queryState.filter.price.startMin,
      classes: [...PRICE_FILTER.price, ...PRICE_FILTER.minPrice],
    });

    const maxValue = createDiv({
      text: startMax,
      classes: [...PRICE_FILTER.price, ...PRICE_FILTER.maxPrice],
    });

    createPriceRange(rangeWrapper, Number(startMin), Number(startMax));

    createDiv({
      classes: PRICE_FILTER.rangeEls,
      parent: wrapper,
      children: [minValue, rangeWrapper, maxValue],
    });
  });

  return wrapper;
}
