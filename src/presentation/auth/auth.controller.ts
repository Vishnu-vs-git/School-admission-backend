import { Body, Controller, Get, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LOGIN_USE_CASE, REGISTER_USE_CASE } from 'src/common/di/injection-token';
import { CookieUtil } from 'src/common/utils/cookie.util';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { registerSchema } from './schemas/register.schema';
import type { IRegisterUseCase } from 'src/application/interfaces/use-cases/auth/register.use-case.interface';
import type { ILoginUseCase } from 'src/application/interfaces/use-cases/auth/login.use-case.interface';
import { RegisterDto } from 'src/application/dto/auth/register.dto';
import { UserResponseDto } from 'src/application/dto/auth/user-response.dto';
import { loginSchema } from './schemas/login.schema';
import { LoginDto } from 'src/application/dto/auth/login.dto';
import type { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { JwtPayload } from 'src/application/types/jwt-payload.type';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(REGISTER_USE_CASE)
    private readonly registerUseCase: IRegisterUseCase,

    @Inject(LOGIN_USE_CASE)
    private readonly loginUseCase: ILoginUseCase,

    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(
    @Body(new ZodValidationPipe(registerSchema))
    dto: RegisterDto,
  ): Promise<UserResponseDto> {
    return this.registerUseCase.execute(dto);
  }

  @Post('login')
  async login(
    @Body(new ZodValidationPipe(loginSchema))
    dto: LoginDto,

    @Res({ passthrough: true })
    response: Response,
  ): Promise<UserResponseDto> {
    const result = await this.loginUseCase.execute(dto);

    CookieUtil.setAccessToken(response, result.accessToken, this.configService);

    CookieUtil.setRefreshToken(response, result.refreshToken, this.configService);

    return result.user;
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@CurrentUser() user: JwtPayload) {
    return user;
  }
}
