import { createButton } from '../../../utils/create-elements/create-tags';
import type { Category } from '@commercetools/platform-sdk';

export function createCategoryButton(category: Category): HTMLButtonElement {
  const button = createButton({
    text: category.name['en'],
    classes: ['p-2', 'bg-[var(--hover-link-header)]', 'cursor-pointer', 'text-white', 'm-1', 'text-lg'],
  });

  return button;
}
