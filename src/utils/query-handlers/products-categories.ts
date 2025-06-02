export function handleCategoryClick(categorySlug: string, subcategorySlug?: string): void {
  const slug = subcategorySlug ? `category=${categorySlug}&subcategory=${subcategorySlug}` : `category=${categorySlug}`;
  globalThis.location.hash = `#catalog?${slug}`;
}
