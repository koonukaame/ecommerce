import { createSpan } from '../../utils/create-elements/create-tags';

export function createActivePromocodeComponent(): HTMLSpanElement {
  const activePromocodeWrapper = createSpan({
    text: 'Use "WELCOME15" promocode to get 15% discount',
    classes: ['text-2xl', 'p-4'],
  });

  return activePromocodeWrapper;
}
