import { createSelect, createOption } from '../../utils/create-elements/create-tags';
import { handleSortSelection } from '../../utils/products-sort/products-sort';
import { SORTING_OPTIONS } from '../../pages/catalog/constants';

export function createSortComponent(parent: HTMLDivElement): HTMLSelectElement {
  const select = createSelect({
    attributes: {
      name: 'sort',
    },
    parent,
    events: {
      change: handleSortSelection,
    },
  });

  const options = Object.values(SORTING_OPTIONS).map((element) => createOption(element));
  select.append(...options);

  return select;
}
