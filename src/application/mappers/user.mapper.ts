import { User } from '../../domain/entities/user.entity';
import { RegisterDto } from '../dto/auth/register.dto';
import { UserResponseDto } from '../dto/auth/user-response.dto';

export class UserMapper {
  static toEntity(dto: RegisterDto): User {
    return new User({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role,
    });
  }

  static toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id!,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!,
    };
  }
}
