import { createA, createSpan } from '../../utils/create-elements/create-tags';

export function createLinkWithPicture(
  name: string,
  url: string,
  logoClasses: string[],
  linkClasses: string[],
  isPictureFirst = true,
): HTMLAnchorElement {
  const logo = createSpan({
    classes: logoClasses,
  });

  const label = createSpan({
    text: name,
  });

  const link = createA({
    classes: linkClasses,
    children: isPictureFirst ? [logo, label] : [label, logo],
    attributes: { target: '_blank', href: url },
  });

  return link;
}
