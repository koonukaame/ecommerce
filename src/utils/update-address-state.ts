import type { ProfileDataState } from '../app/types';

type Address = {
  id?: string | undefined;
  streetName?: string | undefined;
  country?: string | undefined;
  postalCode?: string | undefined;
  city?: string | undefined;
};
export function updateAddressState(state: ProfileDataState, address: Address): void {
  state.country.value = address.country || '';
  state.city.value = address.city || '';
  state.streetName.value = address.streetName || '';
  state.postalCode.value = address.postalCode || '';

  state.country.error = false;
  state.city.error = false;
  state.streetName.error = false;
  state.postalCode.error = false;
}
