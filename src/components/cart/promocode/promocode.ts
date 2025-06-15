import { BUTTON, INPUT } from '../../../shared/styles';
import { createButton, createDiv, createInput } from '../../../utils/create-elements/create-tags';
import { applyPromocodeHandler } from '../../../utils/promocode-handlers/apply-promocode-handler';

export function createPromocodeComponent(parent: HTMLDivElement): HTMLDivElement {
  const promocodeInput = createInput({
    classes: INPUT.search,
    attributes: {
      name: 'promocode',
      placeholder: 'Enter promocode',
    },
  });

  const baseClasses = [...BUTTON.general, ...BUTTON.generalFocus, ...BUTTON.generalHover];
  const filteredClasses = baseClasses.filter((cls) => cls !== 'w-full' && cls !== 'h-[50px]');

  const applyPromocodeButton = createButton({
    text: 'apply promocode',
    classes: [...filteredClasses, 'text-[12px]', 'h-auto', 'w-[200px]'],
    events: {
      click: async () => applyPromocodeHandler(promocodeInput),
    },
  });

  const promocodeWrapper = createDiv({
    children: [promocodeInput, applyPromocodeButton],
    parent,
    classes: ['flex', 'flex-col', 'gap-2', 'mt-4'],
  });

  return promocodeWrapper;
}
