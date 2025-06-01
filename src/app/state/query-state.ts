import type { QueryState } from '../types';

export const queryState: QueryState = {
  search: '',
  sort: '',
  filter: {
    price: {
      min: undefined,
      max: undefined,
      startMin: undefined,
      startMax: undefined,
    },
    length: [],
  },
  category: '',
};
