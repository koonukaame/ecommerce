export type Address = {
  city: string;
  country: string;
  postalCode: string;
  streetName: string;
};

export type AppState = {
  currentPage: PageType;
  isLogined: boolean;
};

export type AuthTokenError = {
  message: string;
};

export type AuthTokenInfo = {
  access_token: string;
  expires_at: number;
  expires_in: number;
  message?: string;
  refresh_token: string;
  scope?: string;
  token_type?: string;
};

export type AuthTokenSuccess = string;

export type ClientInfo = {
  clientId: string;
  isPlatformClient: boolean;
};

export type DefaultAddresses = Record<'defaultBillingAddress' | 'defaultShippingAddress', boolean>;

export type FieldState = {
  error: boolean | undefined;
  rawValue: string;
  value: string;
};

export type LoginState = Record<string, { error: boolean | undefined; value: string }>;

export type PageType =
  | 'about'
  | 'basket'
  | 'catalog'
  | 'error'
  | 'login'
  | 'main'
  | 'product'
  | 'profile'
  | 'registration';

export type RegisterError = {
  message: string;
};

export type RegistrationState = Record<string, FieldState>;

export type ProfileDataState = Record<string, FieldState>;

export type FetchError = {
  message: string;
};

export type BreadcrumbItem = {
  label: string;
  callback: () => void;
};

export type BreadcrumbLevel = {
  label: string;
  page: PageType;
  slug?: string;
};

export type UpdatedPassword = {
  currentPassword: string;
  newPassword: string;
};

export type PersonalData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
};
