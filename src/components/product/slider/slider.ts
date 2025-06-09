import type { Image } from '@commercetools/platform-sdk';

import Swiper from 'swiper';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import './slider.css';

import { createDiv } from '../../../utils/create-elements/create-tags';
import { createModalSlider } from './modal-slider';
import { appendImages } from './append-images';
import { SLIDER_CLASSES } from '../../../pages/product/constants';

Swiper.use([EffectFade, Navigation, Pagination]);

const containerSlider = createDiv({ classes: SLIDER_CLASSES.containerSlider });
const container = createDiv({ classes: ['swiper-container'], parent: containerSlider });

export function ProductSlider(slides: Image[] | undefined): HTMLElement {
  if (!slides) {
    return createDiv({ classes: ['w-[50%]', 'px-5'], text: 'NO IMAGES' });
  }

  container.textContent = '';
  const wrapper = createDiv({ classes: SLIDER_CLASSES.wrapper, parent: container });
  appendImages(wrapper, slides, SLIDER_CLASSES.imageContainer, SLIDER_CLASSES.image, {
    click: (event) => createModalSlider(event, slides),
  });

  return containerSlider;
}

export function initSlider(): void {
  createDiv({ classes: ['swiper-button-prev'], parent: container });

  createDiv({ classes: ['swiper-button-next'], parent: container });

  createDiv({ classes: ['swiper-pagination'], parent: container });

  setTimeout(() => {
    new Swiper('.swiper-container', {
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
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
