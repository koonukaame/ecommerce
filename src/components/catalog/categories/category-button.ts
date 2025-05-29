import { queryState } from '../../../app/state/query-state';
import { createButton } from '../../../utils/create-elements/create-tags';
import type { Category } from '@commercetools/platform-sdk';
import { applyQuery } from '../../../utils/apply-query/apply-query';

export function createCategoryButton(category: Category): HTMLButtonElement {
  const button = createButton({
    text: category.name['en'],
    classes: ['p-2', 'bg-[var(--hover-link-header)]', 'cursor-pointer', 'text-white', 'm-1', 'text-lg'],
    events: {
      click: async () => {
        queryState.categories.push(category.id);
        await applyQuery();
      },
    },
  });

  return button;
}
