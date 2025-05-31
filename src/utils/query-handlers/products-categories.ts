import { getCategories } from '../../app/api/get-categories';
import type { Category } from '@commercetools/platform-sdk';
import { categoryEventEmitter } from '../../components/catalog/categories/category-wrapper';
import { changePath } from '../../app/router/handlers';

export async function handleCategoryButtonClick(category: Category): Promise<void> {
  const response = await getCategories();
  if ('message' in response) {
    return;
  }

  const categories = response.results;

  const parentId = category.parent?.id;
  const parentCategory = parentId ? categories.find((category) => category.id === parentId) : undefined;

  const parentSlug = parentCategory?.slug['en'];
  const currentSlug = category.slug['en'];

  const slug = parentSlug ? `category=${parentSlug}&subcategory=${currentSlug}` : `category=${currentSlug}`;

  changePath('catalog', slug)();

  const subcategories = categories.filter((subcategory: Category) => subcategory.parent?.id === category.id);

  categoryEventEmitter.emit('subcategories', {
    parentId: category.id,
    subcategories,
  });
}
