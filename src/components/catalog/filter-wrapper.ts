import { createDropdownFilter } from './filter-dropdown-button';
import { createPriceFilter } from './filter-price/filter-price';
import { createDiv } from '../../utils/create-elements/create-tags';
import { CATALOG } from '../../pages/catalog/constants';
import { createLengthFilter } from './filter-length';

export function createFilterWrapper(): HTMLDivElement {
  const label = createDiv({ text: 'Filter by:' });

  const priceFilter = createPriceFilter();
  const lengthFilter = createLengthFilter();

  const priceDropdown = createDropdownFilter(priceFilter, 'Price');
  const lengthDropdown = createDropdownFilter(lengthFilter, 'Length');

  const filters = createDiv({ children: [priceDropdown, lengthDropdown], classes: CATALOG.filters });

  const wrapper = createDiv({ classes: CATALOG.filterWrapper, children: [label, filters] });

  return wrapper;
}
