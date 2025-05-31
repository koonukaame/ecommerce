import { createDiv, createInput, createSpan } from '../../../../utils/create-elements/create-tags';
import { handleLengthFilterChange } from '../../../../utils/query-handlers/products-length-filter';
import { LENGTH_OPTIONS } from '../../../../shared/constants';
import { CustomEventEmitter } from '../../../../utils/event-emitter';
import { LENGTH_FILTER } from '../../../../pages/catalog/constants';

export const clearLengthEmitter = new CustomEventEmitter();

export function createLengthFilter(): HTMLDivElement {
  const wrapper = createDiv({ classes: LENGTH_FILTER.lengthFilterWrapper });

  const checkboxes: HTMLInputElement[] = [];

  for (const length of LENGTH_OPTIONS) {
    const optionWrapper = createDiv({
      classes: LENGTH_FILTER.optionWrapper,
      parent: wrapper,
      events: {
        click: () => {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        },
      },
    });

    const checkbox = createInput({
      attributes: {
        type: 'checkbox',
        value: length,
      },
      events: { change: handleLengthFilterChange, click: (event) => event.stopPropagation() },
      parent: optionWrapper,
    });

    checkboxes.push(checkbox);

    createSpan({ text: length, parent: optionWrapper, classes: LENGTH_FILTER.optionText });
  }

  clearLengthEmitter.subscribe('clear-length-filters', () => {
    for (const checkbox of checkboxes) {
      checkbox.checked = false;
    }
  });

  return wrapper;
}
