import { getCategories } from '../../app/api/get-categories';
import { Page } from '../../app/constants';
import { BreadCrumbsLayout, getBreadcrumbsChain, getBreadcrumbs } from '../../shared/components/breadcrumbs';
import { getParametersCatalog } from '../../helpers/get-categories-catalog';

export async function createBreadcrumbs(layout: HTMLDivElement): Promise<void> {
  const { category: categorySlug, subcategory: subcategorySlug } = getParametersCatalog();

  const response = await getCategories();

  if (typeof response === 'object' && response !== null && 'message' in response) {
    return;
  }

  const categories = response.results;

  const category = categories.find((category) => category.slug.en === categorySlug);
  const subcategory = categories.find((category) => category.slug.en === subcategorySlug);

  const breadcrumbs = getBreadcrumbsChain(
    Page.catalog,
    Page.product,
    undefined,
    undefined,
    undefined,
    category,
    subcategory,
  );

  const breadcrumb = BreadCrumbsLayout(getBreadcrumbs(breadcrumbs));
  breadcrumb.classList.add('text-center');

  layout.append(breadcrumb);
}
