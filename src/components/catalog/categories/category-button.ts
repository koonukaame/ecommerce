import { createButton } from '../../../utils/create-elements/create-tags';
import type { Category } from '@commercetools/platform-sdk';
import { CATEGORY_BUTTON } from '../../../pages/catalog/constants';
import { handleCategoryButtonClick } from '../../../utils/query-handlers/products-categories';

export function createCategoryButton(category: Category): HTMLButtonElement {
  const button = createButton({
    text: category.name['en'],
    classes: CATEGORY_BUTTON.button,
    events: {
      click: () => handleCategoryButtonClick(category),
    },
  });

  return button;
}
