import type { QueryState } from '../types';

export const queryState: QueryState = {
  isApplyingQuery: false,
  search: '',
  sort: '',
  filter: {
    price: {
      min: '',
      max: '',
      startMin: undefined,
      startMax: undefined,
    },
    length: [],
  },
  category: '',
  offset: 0,
  products: 0,
};
