import { createDiv, createImg, createInput } from '../../utils/create-elements/create-tags';
import { handleSearchInput } from '../../utils/products-search/products-search';
import { INPUT } from '../../shared/styles';
import { CATALOG, SVG } from '../../pages/catalog/constants';

export function createSearchWrapper(parent: HTMLDivElement): HTMLDivElement {
  const glass = createImg({
    attributes: {
      src: '/svg/magnifying-glass.svg',
      alt: 'magnifying glass',
    },
    classes: SVG.svgPicture,
  });
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

  const searchWrapper = createDiv({ children: [glass, searchInput], parent, classes: CATALOG.searchWrapper });

  return searchWrapper;
}
