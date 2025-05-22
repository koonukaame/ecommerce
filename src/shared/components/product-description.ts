import type { ProductProjection } from '@commercetools/platform-sdk';
import { createSpan } from '../../utils/create-elements/create-tags';

export function createProductDescription(product: ProductProjection, classes: string[]): HTMLSpanElement {
  const description = createSpan({ text: product.description?.en || 'Just a cool product for you!', classes });

  return description;
}
