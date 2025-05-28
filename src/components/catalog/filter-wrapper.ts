import { createDropdownFilter } from './filter-dropdown-button';
import { createPriceFilter } from './filter-price/filter-price';
import { createDiv } from '../../utils/create-elements/create-tags';
import { CATALOG } from '../../pages/catalog/constants';

export function createFilterWrapper(): HTMLDivElement {
  const label = createDiv({ text: 'Filter by:' });

  const priceFilter = createPriceFilter();

  const dropdown = createDropdownFilter(priceFilter, 'Price');

  const wrapper = createDiv({ classes: CATALOG.filterWrapper, children: [label, dropdown] });

  return wrapper;
}
