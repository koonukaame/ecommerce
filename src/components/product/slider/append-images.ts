import type { Image } from '@commercetools/platform-sdk';
import { createDiv, createImg } from '../../../utils/create-elements/create-tags';

export function appendImages(
  wrapper: HTMLElement,
  slides: Image[],
  containerClasses: string[],
  imageClasses: string[],
  events: Record<string, (event: Event) => void> = {},
): void {
  slides.map((url, index) => {
    const slide = createDiv({
      classes: containerClasses,
      parent: wrapper,
    });

    createImg({
      classes: imageClasses,
      attributes: { src: url.url, alt: `Slide ${index}`, 'data-id': `${index}`, 'data-testid': 'image-testing' },
      parent: slide,
      events: events,
    });
  });
}
