import { getCategories } from '../../app/api/get-categories';
import { createCategoryWrapper } from '../../components/catalog/categories/category-wrapper';
import { getParameter } from '../../app/router/handlers';

export async function fetchCategories(layout: HTMLDivElement): Promise<void> {
  try {
    const response = await getCategories();

    if ('results' in response) {
      const parameters = new URLSearchParams(getParameter());
      const categorySlug = parameters.get('category');
      const subcategorySlug = parameters.get('subcategory');

      const currentCategory = response.results.find((category) => category.slug.en === categorySlug);
      const currentSubcategory = response.results.find((subcategory) => subcategory.slug.en === subcategorySlug);

      const categoryList = createCategoryWrapper(response.results, currentCategory?.id, currentSubcategory?.id);

      layout.append(categoryList);
    }
  } catch {
    throw new Error('Failed to fetch categories');
  }
}
