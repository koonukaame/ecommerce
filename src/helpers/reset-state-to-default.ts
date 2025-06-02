import type { ProfileDataState } from '../app/types';

export function resetStateToDefault(state: ProfileDataState): void {
  for (const value of Object.values(state)) {
    value.error = undefined;
    value.value = '';
    value.rawValue = '';
  }
}
