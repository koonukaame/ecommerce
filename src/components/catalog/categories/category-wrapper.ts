import { createDiv } from '../../../utils/create-elements/create-tags';
import type { Category } from '@commercetools/platform-sdk';
import { createCategoryButton } from './category-button';
import { CustomEventEmitter } from '../../../utils/event-emitter';

export const categoryEventEmitter = new CustomEventEmitter();

export function createCategoryWrapper(
  categories: Category[],
  categoryId?: string,
  subcategoryId?: string,
): HTMLDivElement {
  const wrapper = createDiv({});

  if (subcategoryId) {
    return wrapper;
  }

  if (categoryId) {
    const subcategories = categories.filter((category) => category.parent?.id === categoryId);

    for (const subcategory of subcategories) {
      const button = createCategoryButton(subcategory);
      wrapper.append(button);
    }

    return wrapper;
  }

  const rootCategories = categories.filter((category) => !category.parent);
  for (const category of rootCategories) {
    const button = createCategoryButton(category);
    wrapper.append(button);
  }

  return wrapper;
}
