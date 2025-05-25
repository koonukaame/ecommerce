import { createDiv } from '../../utils/create-elements/create-tags';
import { CATALOG } from '../../pages/catalog/constants';

export function createCatalogErrorMessage(parent: HTMLDivElement, message: string): HTMLDivElement {
  const searchErrorMessage = createDiv({
    classes: CATALOG.noResults,
    parent,
    text: message,
  });

  return searchErrorMessage;
}
