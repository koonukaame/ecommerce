import { createSelect, createOption } from '../../utils/create-elements/create-tags';
import { handleSortSelection } from '../../utils/query-handlers/products-sort';
import { SORTING_OPTIONS } from '../../pages/catalog/constants';
import { SELECT } from '../../shared/styles';

export function createSortComponent(): HTMLSelectElement {
  const select = createSelect({
    attributes: {
      name: 'sort',
    },
    events: {
      change: handleSortSelection,
    },
    classes: SELECT.catalog,
  });

  const options = Object.values(SORTING_OPTIONS).map((element) => createOption(element));
  select.append(...options);

  return select;
}
