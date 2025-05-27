import { createDiv, createLabel } from '../../../utils/create-elements/create-tags';
import { queryState } from '../../../app/state/query-state';
import { getRangePrices } from '../../../utils/products-fetch/price-range';
import { createPriceSlider } from './price-slider';

export function createPriceFilter(parent: HTMLDivElement): HTMLDivElement {
  const wrapper = createDiv({
    classes: ['flex', 'flex-col', 'gap-2', 'p-4', 'w-full', 'max-w-md'],
    parent,
  });

  createLabel({ text: 'Filter by Price:', parent: wrapper });

  getRangePrices().then(({ min, max }) => {
    queryState.filter.price.min = String(min);
    queryState.filter.price.max = String(max);

    const sliderContainer = createDiv({
      classes: ['w-full', 'h-2'],
      parent: wrapper,
    });

    const minValue = createDiv({ text: `${min}` });
    const maxValue = createDiv({ text: `${max}` });

    createDiv({
      classes: ['flex', 'justify-between', 'text-sm', 'text-gray-700'],
      children: [minValue, maxValue],
      parent: wrapper,
    });

    createPriceSlider(sliderContainer, min, max);
  });

  return wrapper;
}
