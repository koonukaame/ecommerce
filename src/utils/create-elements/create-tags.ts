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

export const createButton = createElementFactory('button');