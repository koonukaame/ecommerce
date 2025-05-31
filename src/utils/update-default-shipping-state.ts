import { shippingAddressState } from '../app/state/profile/default-shipping-state';

export function updateShippingAddressState(address): void {
  console.log('адрес', address);
  shippingAddressState.country.value = address.country || '';
  shippingAddressState.city.value = address.city || '';
  shippingAddressState.streetName.value = address.streetName || '';
  shippingAddressState.postalCode.value = address.postalCode || '';

  shippingAddressState.country.error = false;
  shippingAddressState.city.error = false;
  shippingAddressState.streetName.error = false;
  shippingAddressState.postalCode.error = false;
}
