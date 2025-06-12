import { createButton } from '../../utils/create-elements/create-tags';
import { BUTTONS_CONFIG } from '../ui-config/button';

export function removeProductButton(attributes: Record<string, string>, isCart = false): HTMLButtonElement {
  const baseConfig = BUTTONS_CONFIG.removeFromCart;

  const baseClasses = baseConfig.classes ?? [];

  const filteredClasses = baseClasses.filter((cls) => cls !== 'w-full' && cls !== 'h-[50px]');

  const classes = isCart ? [...filteredClasses, 'text-[12px]', 'h-auto', 'max-w-[100px]'] : (baseConfig.classes ?? []);

  return createButton({
    ...baseConfig,
    attributes: attributes,
    classes,
  });
}
