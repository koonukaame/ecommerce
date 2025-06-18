import { createSpan } from '../../utils/create-elements/create-tags';

export function createActivePromocodeComponent(text: string): HTMLSpanElement {
  const activePromocodeWrapper = createSpan({
    text,
    classes: ['sm:text-2xl', 'text-lg', 'pt-4', 'text-center'],
  });

  return activePromocodeWrapper;
}
