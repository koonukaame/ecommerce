import { NOT_FOUND_INDEX } from '../shared/constants';

type Categories = {
  category?: string;
  subcategory?: string;
};

export function getParametersCatalog(): Categories {
  const hash = location.hash;
  const queryIndex = hash.indexOf('?');
  if (queryIndex === NOT_FOUND_INDEX) {
    return {};
  }

  const queryString = hash.slice(queryIndex + 1);
  const parameters = new URLSearchParams(queryString);

  return {
    category: parameters.get('category') || undefined,
    subcategory: parameters.get('subcategory') || undefined,
  };
}
