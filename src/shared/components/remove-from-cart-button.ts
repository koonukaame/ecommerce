import { createButton } from '../../utils/create-elements/create-tags';
import { BUTTONS_CONFIG } from '../ui-config/button';

export function removeProductButton(attributes: Record<string, string>): HTMLButtonElement {
  return createButton({
    ...BUTTONS_CONFIG.removeFromCart,
    attributes: attributes,
  });
}
