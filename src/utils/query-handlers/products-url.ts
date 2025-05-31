import { getParameter } from '../../app/router/handlers';
import { getCategories } from '../../app/api/get-categories';
import { queryState } from '../../app/state/query-state';
import { categoryEventEmitter } from '../../components/catalog/categories/category-wrapper';
import { applyQuery } from '../apply-query/apply-query';

export async function handleURLProductsFilter(): Promise<void> {
  const parameters = new URLSearchParams(getParameter());
  const categorySlug = parameters.get('category');
  const subcategorySlug = parameters.get('subcategory');

  if (!categorySlug) {
    return;
  }

  const response = await getCategories();
  if ('message' in response) {
    return;
  }

  const categories = response.results;

  const currentCategory = categories.find((category) => category.slug.en === categorySlug);
  const currentSubcategory = subcategorySlug
    ? categories.find((category) => category.slug.en === subcategorySlug)
    : undefined;

  queryState.category = '';

  if (currentSubcategory) {
    queryState.category = currentSubcategory.id;
  } else if (currentCategory) {
    queryState.category = currentCategory.id;

    const subcategories = categories.filter((subcategories) => subcategories.parent?.id === currentCategory.id);
    categoryEventEmitter.emit('subcategories', subcategories);
  }

  console.log(queryState.category);

  await applyQuery();
}
