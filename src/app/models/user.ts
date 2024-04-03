export interface TokenData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  refresh_expires_in: number;
  roles: string[];
}

export interface Token {
  accessTokenResponse: TokenData;
  roles: string[];
  userId: string;
}

export enum Roles {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  USER = 'USER',
}
