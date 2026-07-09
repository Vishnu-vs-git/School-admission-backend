import { JwtPayload } from 'src/application/types/jwt-payload.type';

export interface IJwtService {
  generateToken(payload: JwtPayload): Promise<string>;

  verifyToken(token: string): Promise<JwtPayload>;
}
