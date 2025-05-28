import { createDiv, createButton } from '../../utils/create-elements/create-tags';
import { FILTER_DROPDOWN } from '../../pages/catalog/constants';

export function createDropdownFilter(element: HTMLDivElement, label: string): HTMLDivElement {
  const wrapper = createDiv({ classes: FILTER_DROPDOWN.wrapper });

  createButton({
    classes: FILTER_DROPDOWN.toggleButton,
    text: label,
    parent: wrapper,
    events: {
      click: () => dropdown.classList.toggle('hidden'),
    },
  });

  const dropdown = createDiv({ classes: FILTER_DROPDOWN.dropdownContainer, children: [element], parent: wrapper });

  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !wrapper.contains(event.target)) {
      dropdown.classList.add('hidden');
    }
  });

  return wrapper;
}
