import noUiSlider, { type API } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { handlePriceFilterChange } from '../../../utils/query-handlers/products-price-filter';

export function createPriceSlider(parent: HTMLDivElement, min: number, max: number): API {
  const slider = noUiSlider.create(parent, {
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

  slider.on('change', (values: (string | number)[]) => handlePriceFilterChange(values));

  return slider;
}
