export const MIN_CLASSES_AMOUNT = 0;
export const MIN_CHILDREN_AMOUNT = 0;
export const VISIBLE_MS = 2000;

export const REGEX = {
  EMAIL: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
  EMAIL_AT: /^.*[@]/,
  EMAIL_DOMAIN_NAME: /^.*[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
  GENERAL: /^[A-Za-z\s]+$/,
  PASSWORD_LENGTH: /^.{8,}$/,
  PASSWORD_LOWERCASE: /^(?=.*[a-z])/,
  PASSWORD_NUMBER: /^.*[0-9]/,
  PASSWORD_UPPERCASE: /^(?=.*[A-Z])/,
  POSTAL_CODE: /^\d{6}$/,
  STREET: /.+/,
};

export const ERROR_MESSAGES = {
  AGE_RESTRICTION: 'Must be 13 or older',
  CITY: 'Must contain at least one character and no special characters or numbers',
  CUSTOMER_NOT_FOUND: 'Customer account with the given credentials not found.',
  EMAIL: 'Email address must be properly formatted (e.g., user@example.com)',
  EMAIL_AT: 'Email address must contain an @ symbol separating local part and domain name',
  EMAIL_DOMAIN_NAME: 'Email address must contain a domain name (e.g., example.com)',
  FIRST_NAME: 'Must contain at least one character and no special characters or numbers',
  LAST_NAME: 'Must contain at least one character and no special characters or numbers',
  PASSWORD_LENGTH: 'Password must be at least 8 characters long',
  PASSWORD_LOWERCASE: 'Password must contain at least one lowercase letter (a-z)',
  PASSWORD_NUMBER: 'Password must contain at least one digit (0-9)',
  PASSWORD_UPPERCASE: 'Password must contain at least one uppercase letter (A-Z)',
  POSTAL_CODE: 'Must contain 6 digits',
  STREET: 'Must contain at least one character',
  UNEXPECTED_ERROR: 'Unexpected error occurred. Please try again.',
  WRONG_CREDENTIALS: "Can't log in. Check your email and password",
};
