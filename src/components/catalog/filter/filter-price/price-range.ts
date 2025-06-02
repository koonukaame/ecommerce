import 'nouislider/dist/nouislider.css';
import './style.css';
import noUiSlider, { type API } from 'nouislider';
import { handlePriceFilterChange } from '../../../../utils/query-handlers/products-price-filter';
import { CustomEventEmitter } from '../../../../utils/event-emitter';

export const clearPriceEmitter = new CustomEventEmitter();

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

  clearPriceEmitter.subscribe('clear-price-filter', (arguments_: unknown) => {
    if (typeof arguments_ === 'object' && arguments_ !== null && 'min' in arguments_ && 'max' in arguments_) {
      const { min, max } = arguments_;
      if (typeof min === 'number' && typeof max === 'number') {
        range.set([min, max]);
      }
    }
  });

  return range;
}
