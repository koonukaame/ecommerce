import { createDiv, createLabel } from '../../utils/create-elements/create-tags';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { queryState } from '../../app/state/query-state';
import { getRangePrices } from '../../utils/products-fetch/price-range';
import { applyQuery } from '../../utils/apply-query/apply-query';

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

    const slider = noUiSlider.create(sliderContainer, {
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

    slider.on('change', async (values: (string | number)[]) => {
      const [newMin, newMax] = values.map(Number);

      queryState.filter.price.min = String(newMin);
      queryState.filter.price.max = String(newMax);

      await applyQuery();
    });
  });

  return wrapper;
}
