import { ConfigService } from '@nestjs/config';
import { CookieOptions, Response } from 'express';

import { BaseCookieOptions, CookieConstants } from '../constants/cookie.constants';

export class CookieUtil {
  private static createCookieOptions(configService: ConfigService, maxAge: number): CookieOptions {
    return {
      ...BaseCookieOptions,
      secure: configService.getOrThrow<string>('NODE_ENV') === CookieConstants.PRODUCTION,
      maxAge,
    };
  }

  static setAccessToken(response: Response, token: string, configService: ConfigService): void {
    response.cookie(
      CookieConstants.ACCESS_TOKEN,
      token,
      this.createCookieOptions(
        configService,
        Number(configService.getOrThrow('ACCESS_COOKIE_MAX_AGE')),
      ),
    );
  }

  static setRefreshToken(response: Response, token: string, configService: ConfigService): void {
    response.cookie(
      CookieConstants.REFRESH_TOKEN,
      token,
      this.createCookieOptions(
        configService,
        Number(configService.getOrThrow('REFRESH_COOKIE_MAX_AGE')),
      ),
    );
  }

  static clearTokens(response: Response, configService: ConfigService): void {
    const options = this.createCookieOptions(configService, 0);

    response.clearCookie(CookieConstants.ACCESS_TOKEN, options);

    response.clearCookie(CookieConstants.REFRESH_TOKEN, options);
  }
}
