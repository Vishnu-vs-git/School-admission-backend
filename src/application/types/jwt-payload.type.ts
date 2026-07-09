import { Role } from '../../domain/enums/role.enum';

export type JwtPayload = {
  id: string;
  email: string;
  role: Role;
};
