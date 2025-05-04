export type Options<K extends keyof HTMLElementTagNameMap> = {
  attributes?: Record<string, string>;
  children?: HTMLElement[];
  classes?: string[];
  parent?: HTMLElement;
  tag: K;
  text?: string;
};