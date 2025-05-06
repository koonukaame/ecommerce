import type { Options } from './types';

import { MIN_CHILDREN_AMOUNT, MIN_CLASSES_AMOUNT } from '../../shared/constants';

export function createElement<K extends keyof HTMLElementTagNameMap>(options: Options<K>): HTMLElementTagNameMap[K] {
  const { attributes = {}, children = [], classes = [], events = {}, parent, tag, text = '' } = options;

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

  for (const [eventName, callback] of Object.entries(events)) {
    element.addEventListener(eventName, callback);
  }

  if (parent) {
    parent.append(element);
  }

  return element;
}