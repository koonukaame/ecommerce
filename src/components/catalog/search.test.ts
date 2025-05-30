import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/dom';
import { createSearchWrapper } from './search';

describe('createSearchWrapper', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    const parent = document.createElement('div');
    const wrapper = createSearchWrapper(parent);
    document.body.append(wrapper);
  });
  it('creates a search input image with correct src and alt', () => {
    const img = screen.getByTestId('magnifying-glass-img');

    expect(img).toBeInstanceOf(HTMLImageElement);
    expect(img.getAttribute('src')).toBe('/svg/magnifying-glass.svg');
    expect(img.getAttribute('alt')).toBe('magnifying glass');
  });

  it('creates a correct search image wrapper', () => {
    const imgWrapper = screen.getByTestId('magnifying-glass-img-wrapper');

    expect(imgWrapper).toBeTruthy();
    expect(imgWrapper).toBeInstanceOf(HTMLDivElement);
  });

  it('creates search input with correct placeholder and type', () => {
    const input = screen.getByTestId('product-search-input');
    expect(input).toBeTruthy();
    expect(input.getAttribute('type')).toBe('text');
    expect(input.getAttribute('placeholder')).toBe('Search');
  });
});
