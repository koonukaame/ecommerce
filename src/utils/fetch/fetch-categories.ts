import { getCategories } from '../../app/api/get-categories';
import { createCategoryWrapper } from '../../components/catalog/categories/category-wrapper';

export async function fetchCategories(layout: HTMLDivElement): Promise<void> {
  try {
    const data = await getCategories();

    if ('results' in data) {
      const categoryList = createCategoryWrapper(data.results);
      layout.append(categoryList);

      console.log(data);
    }
  } catch {
    throw new Error('Failed to fetch categories');
  }
}
