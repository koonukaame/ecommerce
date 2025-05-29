import type { Image } from '@commercetools/platform-sdk';

import Swiper from 'swiper';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { createButton, createDiv } from '../../../utils/create-elements/create-tags';
import { appendImages } from './append-images';
import { MODAL_CLASSES } from '../../../pages/product/constants';

Swiper.use([EffectCoverflow, Navigation, Pagination]);

export function createModalSlider(event: Event, slides: Image[]): void {
  document.body.style.overflow = 'hidden';

  const target = event.target;
  const overlay = createDiv({
    classes: MODAL_CLASSES.overlay,
    parent: document.body,
  });
  const modalContent = createDiv({
    classes: MODAL_CLASSES.content,
    parent: overlay,
  });

  createButton({
    text: '×',
    classes: MODAL_CLASSES.closeButton,
    parent: overlay,
    events: {
      click: () => {
        overlay.remove();
        document.body.style.overflow = 'auto';
      },
    },
  });

  const swiperContainer = createDiv({
    classes: ['swiper', 'modalSwiper'],
    parent: modalContent,
  });
  const swiperWrapper = createDiv({
    classes: ['swiper-wrapper'],
    parent: swiperContainer,
  });
  appendImages(swiperWrapper, slides, MODAL_CLASSES.imageContainer, MODAL_CLASSES.image);
  createDiv({ classes: MODAL_CLASSES.pagination, parent: swiperContainer });

  setTimeout(() => {
    new Swiper('.modalSwiper', {
      loop: true,
      navigation: true,
      initialSlide: target instanceof HTMLElement && target.dataset.id ? +target.dataset.id : 0,
      slidesPerView: 'auto',
      centeredSlides: true,
      centeredSlidesBounds: true,
      effect: slides.length > 1 ? 'coverflow' : 'slide',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }, 0);
}
