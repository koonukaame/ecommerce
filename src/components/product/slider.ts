import { createDiv, createImg } from '../../utils/create-elements/create-tags';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import type { Image } from '@commercetools/platform-sdk';
import 'swiper/swiper-bundle.css';
import './slider.css';

Swiper.use([Navigation, Pagination]);

export function ProductSlider(slides: Image[] | undefined): HTMLElement {
  if (!slides) {
    return createDiv({ classes: ['w-[50%]', 'px-5'], text: 'SLIDER' });
  }

  const container = createDiv({ classes: ['swiper-container', 'pb-[30px]'] });
  const wrapper = createDiv({ classes: ['swiper-wrapper'], parent: container });

  slides.map((url, index) => {
    const slide = createDiv({
      classes: ['p-3', 'cursor-pointer', 'swiper-slide', 'text-center'],
      parent: wrapper,
    });

    createImg({
      classes: ['h-auto', 'max-w-[100%]'],
      attributes: { src: url.url, alt: `Slide ${index}` },
      parent: slide,
    });
  });
  if (slides.length > 1) {
    createDiv({ classes: ['swiper-button-prev'], parent: container });

    createDiv({ classes: ['swiper-button-next'], parent: container });

    createDiv({ classes: ['swiper-pagination'], parent: container });

    setTimeout(() => {
      new Swiper('.swiper-container', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }, 0);
  }

  return container;
}
