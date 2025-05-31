import { createDropdownFilter } from './filter-dropdown-button';
import { createPriceFilter } from './filter-price';
import { createDiv, createButton } from '../../../../utils/create-elements/create-tags';
import { CATALOG } from '../../../../pages/catalog/constants';
import { createLengthFilter } from './filter-length';
import { BUTTONS_CONFIG } from '../../../../shared/ui-config/button';

export function createFilterComponent(): HTMLDivElement {
  const label = createDiv({ text: 'Filter by:' });
  const button = createButton(BUTTONS_CONFIG.reset);

  const priceFilter = createPriceFilter();
  const lengthFilter = createLengthFilter();

  const priceDropdown = createDropdownFilter(priceFilter, 'Price');
  const lengthDropdown = createDropdownFilter(lengthFilter, 'Length');

  const filters = createDiv({ children: [priceDropdown, lengthDropdown, button], classes: CATALOG.filters });

  const wrapper = createDiv({ classes: CATALOG.filterWrapper, children: [label, filters] });

  return wrapper;
}
