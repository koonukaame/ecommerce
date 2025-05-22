import { createDiv } from '../../utils/create-elements/create-tags';
import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

export function productLayout(data: ProductProjectionPagedQueryResponse): HTMLDivElement {
  console.log(data);
  const breadcrumb = createDiv({ classes: ['w-full'] });
  const slider = createDiv({ classes: ['w-[50%]'] });
  const description = createDiv({ classes: ['w-[50%]'] });

  const layout = createDiv({
    children: [breadcrumb, slider, description],
    classes: ['w-full'],
  });

  return layout;
}
