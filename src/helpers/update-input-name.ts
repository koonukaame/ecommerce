export type AddressType = 'billing' | 'shipping';

export function updateInputName(element: HTMLElement, addressType: AddressType): void {
  const originalName = element.getAttribute('name') || '';
  element.setAttribute('name', `${addressType}${originalName}`);
}
