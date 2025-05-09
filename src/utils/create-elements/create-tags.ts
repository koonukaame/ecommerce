import type { Options } from './types';

import { createElement } from './create-elements';

type ElementOptions = Omit<Options<keyof HTMLElementTagNameMap>, 'tag'>;

function createElementFactory<K extends keyof HTMLElementTagNameMap>(
  tag: K
): (options: ElementOptions) => HTMLElementTagNameMap[K] {
  return (options) => {
    return createElement({ tag, ...options });
  };
}

export const createDiv = createElementFactory('div');

export const createMain = createElementFactory('main');

export const createInput = createElementFactory('input');

export const createSelect = createElementFactory('select');

export const createButton = createElementFactory('button');

export const createForm = createElementFactory('form');

export const createH2 = createElementFactory('h2');

export const createOption = createElementFactory('option');
