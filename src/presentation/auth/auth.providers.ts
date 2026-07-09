import { LoginUseCase } from 'src/application/use-cases/auth/login.use-case';
import { RegisterUseCase } from 'src/application/use-cases/auth/register.use-case';
import {
  JWT_SERVICE,
  LOGIN_USE_CASE,
  PASSWORD_SERVICE,
  REGISTER_USE_CASE,
  USER_REPOSITORY,
} from 'src/common/di/injection-token';
import { UserRepository } from 'src/infrastructure/persistence/user/user.repository';
import { BcryptPasswordService } from 'src/infrastructure/services/bcrypt/bcrypt-password.service';
import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';

export const authProviders = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: PASSWORD_SERVICE,
    useClass: BcryptPasswordService,
  },
  {
    provide: JWT_SERVICE,
    useClass: JwtTokenService,
  },
  {
    provide: REGISTER_USE_CASE,
    useClass: RegisterUseCase,
  },

  {
    provide: LOGIN_USE_CASE,
    useClass: LoginUseCase,
  },
];
