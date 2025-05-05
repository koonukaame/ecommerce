export type Options<K extends keyof HTMLElementTagNameMap> = {
  attributes?: Record<string, string>;
  children?: HTMLElement[];
  classes?: string[];
  events?: Record<string, (event: Event) => void>;
  parent?: HTMLElement;
  tag: K;
  text?: string;
};