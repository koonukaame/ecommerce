import type { Options } from './types';

export function createElement<K extends keyof HTMLElementTagNameMap>(options: Options<K>): HTMLElementTagNameMap[K] {
  const MIN_CLASSES_AMOUNT = 0;
  const MIN_CHILDREN_AMOUNT = 0;
  const { attributes = {}, children = [], classes = [], parent, tag, text = '' } = options;

  const element = document.createElement(tag);

  if (text) {
    element.textContent = text;
  }

  if (classes.length > MIN_CLASSES_AMOUNT) {
    element.classList.add(...classes);
  }

  if (children.length > MIN_CHILDREN_AMOUNT) {
    element.append(...children);
  }

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  if (parent) {
    parent.append(element);
  }

  return element;
}