import { createDiv } from '../../utils/create-elements/create-tags';
import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { BreadCrumbs } from './breadcrumbs';
import { ProductSlider } from './slider';

export function productLayout(data: ProductProjectionPagedQueryResponse): HTMLDivElement {
  console.log(data);

  const category = data.results[0].categories[0].obj?.name ?? 'category';
  const product = data.results[0].name;

  const breadcrumb = BreadCrumbs([
    [
      category,
      () => {
        console.log('go to category');
      },
    ],
    [
      product,
      () => {
        console.log('go to product');
      },
    ],
  ]);

  const slider = ProductSlider(data.results[0].masterVariant.images);
  const description = createDiv({ classes: ['w-[50%]'] });

  const productContainer = createDiv({
    children: [slider, description],
    classes: ['w-full'],
  });

  const layout = createDiv({
    children: [breadcrumb, productContainer],
    classes: ['w-full', 'flex', 'flex-col'],
  });

  return layout;
}
