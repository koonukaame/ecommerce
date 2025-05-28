import { CENTS_IN_DOLLAR } from '../../shared/constants';

export function createQueryParameters(
  search?: string,
  sort?: string,
  filterPrice?: { min: string; max: string },
  filterLength?: string[],
): string {
  const parameters = new URLSearchParams();

  if (search) {
    parameters.append('text.en', search);
    parameters.append('fuzzy', 'true');
    parameters.append('markMatchingVariants', 'true');
  }

  if (sort) {
    parameters.append('sort', sort);
  }

  if (filterPrice?.min != undefined && filterPrice?.max != undefined) {
    parameters.append(
      'filter',
      `variants.price.centAmount:range(${Number(filterPrice.min) * CENTS_IN_DOLLAR} to ${Number(filterPrice.max) * CENTS_IN_DOLLAR})`,
    );
  }

  if (filterLength && filterLength.length > 0) {
    const values = filterLength.map((value) => `"${value}"`).join(',');
    parameters.append('filter', `variants.attributes.length:${values}`);
  }

  return parameters.toString();
}
