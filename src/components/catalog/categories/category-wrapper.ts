import { createDiv } from '../../../utils/create-elements/create-tags';
import type { Category } from '@commercetools/platform-sdk';
import { createCategoryButton } from './category-button';

export function createCategoryWrapper(categories: Category[]): HTMLDivElement {
  const wrapper = createDiv({});

  for (const category of categories) {
    const button = createCategoryButton(category);
    wrapper.append(button);
  }

  return wrapper;
}
