import { getCategories } from '../../app/api/get-categories';
import { queryState } from '../../app/state/query-state';
import { getParametersCatalog } from '../../helpers/get-categories-catalog';
import { queryChangeEmitter } from '../../components/catalog/layout';

export async function handleURLProductsFilter(): Promise<void> {
  const { category: categorySlug, subcategory: subcategorySlug } = getParametersCatalog();

  if (!categorySlug) {
    return;
  }

  const response = await getCategories();
  if ('message' in response) {
    return;
  }

  const categories = response.results;
  const currentCategory = categories.find((c) => c.slug.en === categorySlug);
  const currentSubcategory = subcategorySlug ? categories.find((c) => c.slug.en === subcategorySlug) : undefined;

  const newCategory = currentSubcategory?.id || currentCategory?.id || '';

  if (queryState.category === newCategory) {
    return;
  }

  if (queryState.category === newCategory) {
    return;
  }
  queryState.category = newCategory;
  queryChangeEmitter.emit('category-change');
}
