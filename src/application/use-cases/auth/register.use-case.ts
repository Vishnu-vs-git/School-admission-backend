import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/application/dto/auth/register.dto';
import { UserResponseDto } from 'src/application/dto/auth/user-response.dto';
import type { IPasswordService } from 'src/application/interfaces/services/password.service.interface';
import { IRegisterUseCase } from 'src/application/interfaces/use-cases/auth/register.use-case.interface';
import { UserMapper } from 'src/application/mappers/user.mapper';
import { ErrorMessages } from 'src/common/constants/error-messages';
import { PASSWORD_SERVICE, USER_REPOSITORY } from 'src/common/di/injection-token';
import type { IUserRepository } from 'src/domain/repositories/interfaces/user.repository';
import { Role } from 'src/domain/enums/role.enum';

@Injectable()
export class RegisterUseCase implements IRegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: IPasswordService,
  ) {}

  async execute(dto: RegisterDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException(ErrorMessages.EMAIL_ALREADY_EXISTS);
    }
    const hashedPassword = await this.passwordService.hash(dto.password);
    const user = UserMapper.toEntity({
      ...dto,
      password: hashedPassword,
      role: Role.PARENT,
    });

    const createdUser = await this.userRepository.create(user);
    return UserMapper.toResponseDto(createdUser);
  }
}

