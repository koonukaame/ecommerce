import type { Image } from '@commercetools/platform-sdk';

import { createDiv } from '../../utils/create-elements/create-tags';
import { BreadCrumbsLayout, getBreadcrumbs, getBreadcrumbsChain } from '../../shared/components/breadcrumbs';
import { initSlider, ProductSlider } from './slider/slider';
import { ProductDescription } from './description';
import { LAYOUT_CLASSES, PRODUCT_CONTAINER_CLASSES } from '../../pages/product/constants';
import { Page } from '../../app/constants';
import { changePath, getParameter } from '../../app/router/handlers';
import { isFetchError } from '../../utils/type-guards/is-fetch-error';
import { getProductById } from '../../app/api';

export type ProductInfo = {
  name: string;
  productSlug: string;
  ID: string;
  category: string;
  categorySlug: string;
  description: string;
  price: number;
  discountPrice: number | undefined;
  photo: Image[];
};

export async function productLayout(): Promise<void | HTMLDivElement> {
  const slug = getParameter();
  const data = await getProductById(slug);

  if (isFetchError(data) || data.count === 0) {
    changePath(Page.error)();
    return;
  }

  const productInfo: ProductInfo = {
    name: data.results[0].name.en,
    productSlug: data.results[0].slug.en,
    ID: data.results[0].id,
    category: data.results[0].categories[0].obj?.name.en ?? '',
    categorySlug: data.results[0].categories[0].obj?.slug.en ?? '',
    description: data.results[0].description?.en ?? '',
    price: data?.results?.[0]?.masterVariant?.prices?.[0].value.centAmount ?? 0,
    discountPrice: data?.results?.[0]?.masterVariant?.prices?.[0].discounted?.value.centAmount,
    photo: data.results[0].masterVariant.images ?? [],
  };

  const breadcrumbs = getBreadcrumbsChain(
    Page.catalog,
    Page.product,
    data.results[0],
    productInfo.name,
    productInfo.productSlug,
  );

  const breadcrumb = BreadCrumbsLayout(getBreadcrumbs(breadcrumbs));

  const slider = ProductSlider(productInfo.photo);

  const description = await ProductDescription(productInfo);

  const productContainer = createDiv({
    children: [slider, description],
    classes: PRODUCT_CONTAINER_CLASSES,
  });

  const layout = createDiv({
    children: [breadcrumb, productContainer],
    classes: LAYOUT_CLASSES,
  });

  if (productInfo.photo.length > 1) {
    initSlider();
  }
  return layout;
}
