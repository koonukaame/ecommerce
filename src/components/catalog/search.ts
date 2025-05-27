import { createDiv, createImg, createInput } from '../../utils/create-elements/create-tags';
import { handleSearchInput } from '../../utils/query-handlers/products-search';
import { INPUT } from '../../shared/styles';
import { CATALOG, IMG } from '../../pages/catalog/constants';

export function createSearchWrapper(parent: HTMLDivElement): HTMLDivElement {
  const glass = createImg({
    attributes: {
      src: '/svg/magnifying-glass.svg',
      alt: 'magnifying glass',
    },
    classes: IMG.glass,
  });

  const imgWrapper = createDiv({ classes: IMG.imgWrapper, children: [glass] });

  const searchInput = createInput({
    attributes: {
      type: 'text',
      placeholder: 'Search',
    },
    classes: INPUT.search,
    events: {
      input: (event) => {
        handleSearchInput(event);
      },
    },
  });

  const searchWrapper = createDiv({ children: [imgWrapper, searchInput], parent, classes: CATALOG.searchWrapper });

  return searchWrapper;
}
