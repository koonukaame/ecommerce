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

export type DefaultAddresses = Record<string, boolean>;

export type FieldState = {
  error: boolean | undefined;
  value: string;
};

export type RegisterError = {
  message: string;
};

export type RegistrationState = Record<string, FieldState>;
