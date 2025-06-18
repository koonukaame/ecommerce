import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/dom';

import { appendImages } from './append-images';

const SLIDER = [
  {
    url: '/public/png/Yanki(51)1.png',
    dimensions: { w: 200, h: 200 },
  },
];

describe('appendImages', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    const parent = document.createElement('div');
    appendImages(parent, SLIDER, ['testImageContainerClass'], ['testImageClass']);
    document.body.append(parent);
  });

  it('creates container with images', () => {
    const image = screen.getByTestId('image-testing');

    expect(image).toBeInstanceOf(HTMLImageElement);
    expect(image).toBeTruthy();
    expect(image.getAttribute('alt')).toBe('Slide 0');
    expect(image.getAttribute('src')).toBe('/public/png/Yanki(51)1.png');
    expect(image.dataset.id).toBe('0');
  });
});
