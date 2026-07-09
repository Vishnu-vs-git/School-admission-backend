import { CookieOptions } from 'express';

export const CookieConstants = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',

  SAME_SITE: 'lax' as const,

  PRODUCTION: 'production',
} as const;

export const BaseCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};
