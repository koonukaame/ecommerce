import { BUTTONS_CONFIG } from '../../shared/components/button';
import { container } from '../../shared/components/container';
import { createButton, createDiv, createImg, createP } from '../../utils/create-elements/create-tags';
import { ERROR, IMAGE_PATH, TEXT } from './constants';

export function ErrorPage(): HTMLElement {
  const image = createImg({
    attributes: { alt: 'Illustration of a 404 error page with a jacket', src: IMAGE_PATH },
    classes: ERROR.image,
  });

  const errorNumber = createP({ classes: ERROR.errorNumber, text: '404' });
  const errorTitle = createP({ classes: ERROR.errorTitle, text: 'Page not Found' });
  const errorText = createP({ classes: ERROR.errorText, text: TEXT });
  const button = createButton(BUTTONS_CONFIG.main);

  const infoWrapper = createDiv({
    children: [errorNumber, errorTitle, errorText, button],
    classes: ERROR.infoWrapper,
  });

  const wrapper = createDiv({ children: [image, infoWrapper], classes: ERROR.wrapper });
  container.append(wrapper);

  return container;
}
