import { mainButton } from '../../shared/components/button';
import { createDiv, createImg, createMain, createP } from '../../utils/create-elements/create-tags';
import { ERROR, IMAGE_PATH, TEXT } from './constants';

export function ErrorPage(): HTMLElement {
  const image = createImg({
    attributes: { alt: 'jacket 404', src: IMAGE_PATH },
    classes: ERROR.image,
  });

  const errorNumber = createP({ classes: ERROR.errorNumber, text: '404' });
  const errorTitle = createP({ classes: ERROR.errorTitle, text: 'Page not Found' });
  const errorText = createP({ classes: ERROR.errorText, text: TEXT });
  const button = mainButton;

  const infoWrapper = createDiv({
    children: [errorNumber, errorTitle, errorText, button],
    classes: ERROR.infoWrapper,
  });

  const wrapper = createDiv({ children: [image, infoWrapper], classes: ERROR.wrapper });
  const container = createMain({ children: [wrapper], classes: ERROR.container, parent: document.body });

  return container;
}
