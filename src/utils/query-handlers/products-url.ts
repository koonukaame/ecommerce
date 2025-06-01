import { getCategories } from '../../app/api/get-categories';
import { queryState } from '../../app/state/query-state';
import { applyQuery } from '../apply-query/apply-query';
import { getParametersCatalog } from '../../helpers/get-categories-catalog';

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

  const currentCategory = categories.find((category) => category.slug.en === categorySlug);
  const currentSubcategory = subcategorySlug
    ? categories.find((category) => category.slug.en === subcategorySlug)
    : undefined;

  queryState.category = '';

  if (currentSubcategory) {
    queryState.category = currentSubcategory.id;
  } else if (currentCategory) {
    queryState.category = currentCategory.id;
  }

  await applyQuery();
}
