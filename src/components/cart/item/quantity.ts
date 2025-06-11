import { createDiv, createButton, createSpan } from '../../../utils/create-elements/create-tags';

export function createQuantityComponent(quantity: number): HTMLDivElement {
  const quantityWrapper = createDiv({
    classes: ['sm:text-[14px]', 'text-[10px]', 'text-gray-500', 'flex', 'flex-col'],
    text: 'Amount:',
  });

  const controls = createDiv({
    parent: quantityWrapper,
    classes: ['flex', 'items-center', 'gap-2'],
  });

  createButton({
    parent: controls,
    classes: ['w-6', 'h-6', 'border', 'rounded', 'text-sm', 'cursor-pointer', 'flex', 'items-center', 'justify-center'],
    text: '-',
  });

  createSpan({
    parent: controls,
    text: quantity.toString(),
  });

  createButton({
    parent: controls,
    classes: ['w-6', 'h-6', 'border', 'rounded', 'text-sm', 'cursor-pointer', 'flex', 'items-center', 'justify-center'],
    text: '+',
  });

  return quantityWrapper;
}
