import { createDiv } from '../../../utils/create-elements/create-tags';
import type { Category } from '@commercetools/platform-sdk';
import { createCategoryButton } from './category-button';
import { CustomEventEmitter } from '../../../utils/event-emitter';

export const categoryEventEmitter = new CustomEventEmitter();

export function createCategoryWrapper(categories: Category[]): HTMLDivElement {
  const wrapper = createDiv({});

  const rootCategories = categories.filter((category) => !category.parent);
  for (const category of rootCategories) {
    const button = createCategoryButton(category);
    wrapper.append(button);
  }

  categoryEventEmitter.subscribe('subcategories', (subcategories: unknown) => {
    if (Array.isArray(subcategories)) {
      wrapper.replaceChildren();

      for (const subcategory of subcategories) {
        wrapper.append(createCategoryButton(subcategory));
      }
    }
  });

  return wrapper;
}
