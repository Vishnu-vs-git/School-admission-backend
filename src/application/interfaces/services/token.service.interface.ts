import { JwtPayload } from 'src/application/types/jwt-payload.type';

export interface IJwtService {
  generateAccessToken(payload: JwtPayload): Promise<string>;

  generateRefreshToken(payload: JwtPayload): Promise<string>;

  verifyAccessToken(token: string): Promise<JwtPayload>;

  verifyRefreshToken(token: string): Promise<JwtPayload>;
}
