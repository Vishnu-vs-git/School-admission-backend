import { Role } from 'src/domain/enums/role.enum';

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
