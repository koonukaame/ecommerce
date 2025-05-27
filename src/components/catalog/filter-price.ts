import { createDiv, createLabel } from '../../utils/create-elements/create-tags';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { queryState } from '../../app/state/query-state';
import { getRangePrices } from '../../utils/products-fetch/price-range';

export function createPriceFilter(parent: HTMLDivElement): HTMLDivElement {
  const wrapper = createDiv({
    classes: ['flex', 'flex-col', 'gap-2', 'p-4', 'w-full', 'max-w-md'],
    parent,
  });

  createLabel({ text: 'Filter by Price:', parent: wrapper });

  getRangePrices().then(() => {
    const min = Number(queryState.filter.price.min);
    const max = Number(queryState.filter.price.max);

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

    noUiSlider.create(sliderContainer, {
      start: [min, max],
      connect: true,
      range: {
        min,
        max,
      },
      step: 1,
      tooltips: [true, true],
      format: {
        to: (value) => Math.round(value).toString(),
        from: Number,
      },
    });
  });

  return wrapper;
}
