import './style.css';
import 'nouislider/dist/nouislider.css';
import noUiSlider, { type API } from 'nouislider';
import { handlePriceFilterChange } from '../../../utils/query-handlers/products-price-filter';

export function createPriceRange(parent: HTMLDivElement, min: number, max: number): API {
  const range = noUiSlider.create(parent, {
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

  range.on('change', (values: (string | number)[]) => handlePriceFilterChange(values));

  return range;
}
