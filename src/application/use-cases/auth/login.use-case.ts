import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { LoginDto } from 'src/application/dto/auth/login.dto';
import { UserMapper } from 'src/application/mappers/user.mapper';
import type { IPasswordService } from 'src/application/interfaces/services/password.service.interface';
import type { IJwtService } from 'src/application/interfaces/services/token.service.interface';
import { JwtPayload } from 'src/application/types/jwt-payload.type';

import type { IUserRepository } from 'src/domain/repositories/interfaces/user.repository';

import { JWT_SERVICE, PASSWORD_SERVICE, USER_REPOSITORY } from 'src/common/di/injection-token';

import { ErrorMessages } from 'src/common/constants/error-messages';
import { ILoginUseCase } from 'src/application/interfaces/use-cases/auth/login.use-case.interface';
import { LoginResult } from 'src/application/interfaces/auth/login-result.interface';
@Injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: IPasswordService,

    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
  ) {}
  async execute(dto: LoginDto): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException(ErrorMessages.INVALID_CREDENTIALS);
    }
    const isPasswordValid = await this.passwordService.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(ErrorMessages.INVALID_CREDENTIALS);
    }
    const payload: JwtPayload = {
      id: user.id!,
      email: user.email,
      role: user.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.generateAccessToken(payload),
      this.jwtService.generateRefreshToken(payload),
    ]);
    return {
      accessToken,
      refreshToken,
      user: UserMapper.toResponseDto(user),
    };
  }
}
