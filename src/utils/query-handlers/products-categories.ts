import { changePath } from '../../app/router/handlers';

export function handleCategoryClick(categorySlug: string, subcategorySlug?: string): void {
  const slug = subcategorySlug ? `category=${categorySlug}&subcategory=${subcategorySlug}` : `category=${categorySlug}`;
  changePath('catalog', slug)();
}
