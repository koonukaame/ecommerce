export const MIN_CLASSES_AMOUNT = 0;
export const MIN_CHILDREN_AMOUNT = 0;

export const REGEX = {
  EMAIL: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
  GENERAL: /^[A-Za-z]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
  POSTAL_CODE: /^\d{6}$/,
  STREET: /.+/,
};

export const ERROR_MESSAGES = {
  AGE_RESTRICTION: 'You must be 13 or older',
  CITY: 'Invalid city format',
  FIRST_NAME: 'Invalid first name format',
  LAST_NAME: 'Invalid last name format',
  POSTAL_CODE: 'Invalid postal code format',
  STREET: 'Invalid street format',
};
