import { Request } from 'express';
import { JwtPayload } from 'src/application/types/jwt-payload.type';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
