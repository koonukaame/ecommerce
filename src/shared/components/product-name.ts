import type { ProductProjection } from '@commercetools/platform-sdk';
import { createSpan } from '../../utils/create-elements/create-tags';

export function createProductName(product: ProductProjection, classes: string[]): HTMLSpanElement {
  const name = createSpan({ text: product.name.en, classes });

  return name;
}
