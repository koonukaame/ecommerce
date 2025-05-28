import { createDiv, createInput, createSpan } from '../../utils/create-elements/create-tags';
import { handleLengthFilterChange } from '../../utils/query-handlers/products-length-filter';
import { LENGTH_OPTIONS } from '../../shared/constants';
import { CustomEventEmitter } from '../../utils/event-emitter';

export const clearLengthEmitter = new CustomEventEmitter();

export function createLengthFilter(): HTMLDivElement {
  const wrapper = createDiv({ classes: ['flex', 'flex-col', 'divide-y', 'w-[200px]', 'divide-gray-200'] });

  const checkboxes: HTMLInputElement[] = [];

  for (const length of LENGTH_OPTIONS) {
    const optionWrapper = createDiv({
      classes: ['flex', 'items-center', 'w-full', 'justify-between', 'p-2', 'hover:bg-gray-100', 'cursor-pointer'],
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

    createSpan({ text: length, parent: optionWrapper, classes: ['text-md', 'text-gray-600'] });
  }

  clearLengthEmitter.subscribe('clear-length-filters', () => {
    for (const checkbox of checkboxes) {
      checkbox.checked = false;
    }
  });

  return wrapper;
}
