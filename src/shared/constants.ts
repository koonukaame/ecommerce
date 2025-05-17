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
  AGE_RESTRICTION: 'Must be 13 or older',
  CITY: 'Must contain at least one character and no special characters or numbers',
  FIRST_NAME: 'Must contain at least one character and no special characters or numbers',
  LAST_NAME: 'Must contain at least one character and no special characters or numbers',
  POSTAL_CODE: 'Must contain 6 digits',
  STREET: 'Must contain at least one character',
};
