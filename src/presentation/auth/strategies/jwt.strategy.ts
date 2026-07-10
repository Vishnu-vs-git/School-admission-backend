import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from 'src/application/types/jwt-payload.type';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          if (!request?.cookies) {
            return null;
          }

          const accessToken = request.cookies.accessToken as string | undefined;

          return accessToken ?? null;
        },
      ]),
      secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),

      ignoreExpiration: false,
    });
  }
  validate(payload: JwtPayload): JwtPayload {
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  }
}
