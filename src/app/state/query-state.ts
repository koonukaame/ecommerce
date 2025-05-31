import type { QueryState } from '../types';

export const queryState: QueryState = {
  lastQueryType: 'none',
  search: '',
  sort: '',
  filter: {
    price: {
      min: '0',
      max: '0',
    },
    length: [],
  },
  category: '',
};
