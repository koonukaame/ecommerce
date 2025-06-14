import { BUTTON, INPUT } from '../../../shared/styles';
import { createButton, createDiv, createInput } from '../../../utils/create-elements/create-tags';
import { applyPromocodeHandler } from '../../../utils/promocode-handlers/apply-promocode-handler';

export function createPromocodeComponent(parent: HTMLDivElement): HTMLDivElement {
  const promocodeInput = createInput({
    classes: INPUT.search,
    attributes: {
      name: 'promocode',
    },
  });

  const applyPromocodeButton = createButton({
    text: 'apply promocode',
    classes: [...BUTTON.general, ...BUTTON.generalFocus, ...BUTTON.generalHover],
    events: {
      click: async () => applyPromocodeHandler(promocodeInput),
    },
  });

  const promocodeWrapper = createDiv({
    children: [promocodeInput, applyPromocodeButton],
    parent,
  });

  return promocodeWrapper;
}
