export type AuthTokenError = {
  message: string;
};

export type AuthTokenInfo = {
  access_token: string
  expires_at: number
  expires_in: number
  message?: string
  refresh_token: string
  scope?: string
  token_type?: string
}

export type AuthTokenSuccess = string;

export type ClientInfo = {
  clientId: string;
  isPlatformClient: boolean;
}

export type Customer = {
    addresses: unknown[];
    authenticationMode: string;
    billingAddressIds: unknown[];
    createdAt: string;
    createdBy: ClientInfo;
    customerGroupAssignments: unknown[];
    dateOfBirth: string;
    email: string;
    firstName: string;
    id: string;
    isEmailVerified: boolean;
    lastMessageSequenceNumber: number;
    lastModifiedAt: string;
    lastModifiedBy: ClientInfo;
    lastName: string;
    password: string;
    shippingAddressIds: unknown[];
    stores: unknown[];
    version: number;
    versionModifiedAt: string;
}
