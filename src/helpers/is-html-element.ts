export function isHTMLElement(elements: unknown[]): elements is HTMLDivElement[] {
  return elements.every((element) => element instanceof HTMLDivElement);
}
