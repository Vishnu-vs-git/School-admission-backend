import { CookieOptions } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

export const CookieConstants = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  PRODUCTION: 'production',
} as const;

export const BaseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
};
