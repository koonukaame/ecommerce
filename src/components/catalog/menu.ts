import { createDiv } from '../../utils/create-elements/create-tags';
import { getCategories } from '../../app/api/get-categories';
import { MENU } from '../../pages/catalog/constants';
import { handleCategoryClick } from '../../utils/query-handlers/products-categories';
import { getParametersCatalog } from '../../helpers/get-categories-catalog';

export async function createCategoryMenu(layout: HTMLDivElement): Promise<HTMLDivElement> {
  const menuWrapper = createDiv({ parent: layout, classes: MENU.wrapper });

  const response = await getCategories();
  if (!('results' in response)) {
    throw new Error('Failed to fetch categories');
  }

  const categories = response.results;

  const { category: activeCategory, subcategory: activeSubcategory } = getParametersCatalog();
  const mainCategories = categories.filter((category) => !category.ancestors || category.ancestors.length === 0);

  for (const mainCategory of mainCategories) {
    const isMainActive = mainCategory.slug.en === activeCategory;
    const categorySection = createDiv({ classes: MENU.category, parent: menuWrapper });

    createDiv({
      text: mainCategory.name.en,
      classes: isMainActive
        ? [...MENU.categoryName, ...MENU.categoryNameActive]
        : [...MENU.categoryName, ...MENU.categoryNameInactive],
      events: {
        click: () => handleCategoryClick(mainCategory.slug.en),
      },
      parent: categorySection,
    });

    const subcategories = categories.filter((subcategory) => subcategory.ancestors?.[0]?.id === mainCategory.id);

    for (const subcategory of subcategories) {
      const isSubcategoryActive = subcategory.slug.en === activeSubcategory;
      createDiv({
        text: subcategory.name.en,
        classes: isSubcategoryActive
          ? [...MENU.subcategoryName, ...MENU.subcategoryNameActive]
          : [...MENU.subcategoryName, ...MENU.subcategoryNameInactive],
        events: {
          click: () => handleCategoryClick(mainCategory.slug.en, subcategory.slug.en),
        },
        parent: categorySection,
      });
    }
  }

  return menuWrapper;
}
