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

export type FetchError = {
  message: string;
};

export type QueryState = {
  lastQueryType: 'none' | 'search' | 'sort' | 'filter-price' | 'filter-length';
  search: string;
  sort: string;
  filter: {
    price: {
      min: string;
      max: string;
    };
    length: string[];
  };
};
