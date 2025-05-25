import { createDiv } from '../../utils/create-elements/create-tags';
import type { Image, LocalizedString, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { BreadCrumbs, type CrumbEntry } from '../../shared/components/breadcrumbs';
import { ProductSlider } from './slider';
import { ProductDescription } from './description';

export type ProductInfo = {
  name: string;
  category: LocalizedString | string;
  slug: LocalizedString;
  description: string;
  price: number;
  discountPrice: number;
  photo: Image[];
};

export function productLayout(data: ProductProjectionPagedQueryResponse): HTMLDivElement {
  console.log(data);

  const productInfo: ProductInfo = {
    name: data.results[0].name.en,
    category: data.results[0].categories[0].obj?.name ?? 'category',
    slug: data.results[0].slug,
    description: data.results[0].description?.en ?? '',
    price: data?.results?.[0]?.masterVariant?.prices?.[0].value.centAmount ?? 0,
    discountPrice: data?.results?.[0]?.masterVariant?.prices?.[0].discounted?.value.centAmount ?? 0,
    photo: data.results[0].masterVariant.images ?? [],
  };

  const breadCrumbParameters: CrumbEntry[] = [
    [
      productInfo.category,
      () => {
        console.log('go to category');
      },
    ],
    [
      productInfo.name,
      () => {
        console.log('go to product');
      },
    ],
  ];

  const breadcrumb = BreadCrumbs(breadCrumbParameters);
  const slider = ProductSlider(productInfo.photo);
  const description = ProductDescription(productInfo);
  const productContainer = createDiv({
    children: [slider, description],
    classes: ['max-w-[1200px]', 'flex', 'flex-col', 'md:flex-row'],
  });

  const layout = createDiv({
    children: [breadcrumb, productContainer],
    classes: ['w-full', 'flex', 'flex-col', 'items-center'],
  });

  return layout;
}
