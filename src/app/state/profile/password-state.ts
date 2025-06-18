import type { ProfileDataState } from '../../types';

export const passwordState: ProfileDataState = {
  currentPassword: {
    error: undefined,
    rawValue: '',
    value: '',
  },
  newPassword: {
    error: undefined,
    rawValue: '',
    value: '',
  },
};
