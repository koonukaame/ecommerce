import type { RoleDescription } from '../../app/types';

import { ABOUT_BASE_CLASSES, ABOUT_CLASSES } from '../../pages/about-us/constants';
import { createDiv, createSpan } from '../../utils/create-elements/create-tags';

export function createRoles(roles: RoleDescription[]): HTMLDivElement {
  const container = createDiv({ classes: ABOUT_BASE_CLASSES.container });

  roles.map(({ label, color }) => {
    createSpan({
      text: label,
      classes: [color, ...ABOUT_CLASSES.role],
      parent: container,
    });
  });

  return container;
}
