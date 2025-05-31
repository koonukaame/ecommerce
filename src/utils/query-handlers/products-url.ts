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

  const allCategories = response.results;

  const matchedCategory = allCategories.find((cat) => cat.slug.en === categorySlug);
  const matchedSubcategory = subcategorySlug ? allCategories.find((cat) => cat.slug.en === subcategorySlug) : undefined;

  queryState.category = '';

  if (matchedSubcategory) {
    queryState.category = matchedSubcategory.id;
  } else if (matchedCategory) {
    queryState.category = matchedCategory.id;

    const subcategories = allCategories.filter((sub) => sub.parent?.id === matchedCategory.id);
    categoryEventEmitter.emit('subcategories', subcategories);
  }

  console.log(queryState.category);

  await applyQuery();
}
