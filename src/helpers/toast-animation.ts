export function toggleToastAnimation(element: HTMLElement, removeClasses: string[], addClasses: string[]): void {
  element.classList.remove(...removeClasses);
  element.classList.add(...addClasses);
}
