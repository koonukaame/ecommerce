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
