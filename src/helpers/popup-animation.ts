export function handleTransitionEnd(event: TransitionEvent): void {
  const popup = event.target;
  if (popup instanceof HTMLDivElement && popup.classList.contains('opacity-0')) {
    popup.remove();
    popup.removeEventListener('transitionend', handleTransitionEnd);
  }
}

export function togglePopupAnimation(element: HTMLElement, removeClasses: string[], addClasses: string[]): void {
  element.classList.remove(...removeClasses);
  element.classList.add(...addClasses);
}
