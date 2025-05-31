import { getCategories } from '../../app/api/get-categories';
import { Page } from '../../app/constants';
import { BreadCrumbsLayout, getBreadcrumbsChain, getBreadcrumbs } from '../../shared/components/breadcrumbs';

export async function createBreadcrumbs(layout: HTMLDivElement): Promise<void> {
  const hashParameters = new URLSearchParams(globalThis.location.hash.split('?')[1] || '');

  const categorySlug = hashParameters.get('category') || undefined;
  const subcategorySlug = hashParameters.get('subcategory') || undefined;

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
