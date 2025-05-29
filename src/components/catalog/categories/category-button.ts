import { queryState } from '../../../app/state/query-state';
import { createButton } from '../../../utils/create-elements/create-tags';
import type { Category } from '@commercetools/platform-sdk';
import { applyQuery } from '../../../utils/apply-query/apply-query';
import { getCategories } from '../../../app/api/get-categories';
import { categoryEventEmitter } from './category-wrapper';

export function createCategoryButton(category: Category): HTMLButtonElement {
  const button = createButton({
    text: category.name['en'],
    classes: ['p-2', 'bg-[var(--hover-link-header)]', 'cursor-pointer', 'text-white', 'm-1', 'text-lg'],
    events: {
      click: async () => {
        queryState.categories.push(category.id);
        await applyQuery();

        const data = await getCategories();
        if ('message' in data) {
          return;
        }
        const subcategories = data.results.filter((subcategory) => subcategory.parent?.id === category.id);

        categoryEventEmitter.emit('subcategories', subcategories);
      },
    },
  });

  return button;
}
