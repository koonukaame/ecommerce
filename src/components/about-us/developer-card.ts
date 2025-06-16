import type { DeveloperInfo as developerInfo } from '../../app/types';

import { ABOUT_CLASSES } from '../../pages/about-us/constants';
import { HEADER3 } from '../../shared/styles';
import { createDiv, createH3, createImg, createP } from '../../utils/create-elements/create-tags';
import { createLinkWithPicture } from './link-with-picture';
import { createRoles } from './roles';

export function createDeveloperCard(info: developerInfo): HTMLElement {
  const photo = createImg({
    classes: ABOUT_CLASSES.developerPhoto,
    attributes: { alt: `${info.name} photo`, src: info.photoURL },
  });

  const name = createH3({
    text: info.name,
    classes: HEADER3.general,
  });

  const roleContainer = createRoles(info.roles);

  const bio = createP({
    classes: ABOUT_CLASSES.biography,
    text: info.description,
  });

  const gitLink = createLinkWithPicture(info.name, info.github, ABOUT_CLASSES.gitLogo, ABOUT_CLASSES.gitLink);

  const container = createDiv({
    classes: ABOUT_CLASSES.cardContainer,
    children: [photo, name, roleContainer, bio, gitLink],
  });

  return container;
}
