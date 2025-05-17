import { type LoginState } from '../types';

export const loginState: LoginState = {
  email: {
    error: undefined,
    value: '',
  },
  password: {
    error: undefined,
    value: '',
  },
};
