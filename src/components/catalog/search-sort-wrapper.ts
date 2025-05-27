import { CATALOG } from '../../pages/catalog/constants';
import { createDiv } from '../../utils/create-elements/create-tags';
import { createSearchWrapper } from './search';
import { createSortComponent } from './sort';

export function createSearchSortWrapper(): HTMLDivElement {
  const searchWrapper = createSearchWrapper();
  const sortComponent = createSortComponent();

  const wrapper = createDiv({ classes: CATALOG.searchSortWrapper, children: [searchWrapper, sortComponent] });

  return wrapper;
}
