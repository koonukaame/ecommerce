import type { Image } from '@commercetools/platform-sdk';

import { createDiv } from '../../utils/create-elements/create-tags';
import { BreadCrumbsLayout, getBreadcrumbs } from '../../shared/components/breadcrumbs';
import { ProductSlider } from './slider/slider';
import { ProductDescription } from './description';
import { LAYOUT_CLASSES, PRODUCT_CONTAINER_CLASSES } from '../../pages/product/constants';
import { Page } from '../../app/constants';
import { changePath, getSlug } from '../../app/router/handlers';
import { isFetchError } from '../../utils/type-guards/is-fetch-error';
import { getProductById } from '../../app/api';

export type ProductInfo = {
  productName: string;
  productSlug: string;
  category: string;
  categorySlug: string;
  description: string;
  price: number;
  discountPrice: number | undefined;
  photo: Image[];
};

export async function productLayout(): Promise<void | HTMLDivElement> {
  const slug = getSlug();
  const data = await getProductById(slug);

  if (isFetchError(data) || data.count === 0) {
    changePath(Page.error)();
    return;
  }

  const productInfo: ProductInfo = {
    productName: data.results[0].name.en,
    productSlug: data.results[0].slug.en,
    category: data.results[0].categories[0].obj?.name.en ?? '',
    categorySlug: data.results[0].categories[0].obj?.slug.en ?? '',
    description: data.results[0].description?.en ?? '',
    price: data?.results?.[0]?.masterVariant?.prices?.[0].value.centAmount ?? 0,
    discountPrice: data?.results?.[0]?.masterVariant?.prices?.[0].discounted?.value.centAmount,
    photo: data.results[0].masterVariant.images ?? [],
  };

  const breadcrumb = BreadCrumbsLayout(
    getBreadcrumbs([
      {
        label: productInfo.category,
        page: Page.catalog,
        slug: productInfo.categorySlug,
      },
      {
        label: productInfo.productName,
        page: Page.product,
        slug: productInfo.productSlug,
      },
    ]),
  );
  const slider = ProductSlider(productInfo.photo);
  const description = ProductDescription(productInfo);

  const productContainer = createDiv({
    children: [slider, description],
    classes: PRODUCT_CONTAINER_CLASSES,
  });

  const layout = createDiv({
    children: [breadcrumb, productContainer],
    classes: LAYOUT_CLASSES,
  });

  return layout;
}
