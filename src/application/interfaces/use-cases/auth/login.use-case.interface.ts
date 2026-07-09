import { LoginDto } from 'src/application/dto/auth/login.dto';
import { LoginResult } from '../../auth/login-result.interface';

export interface ILoginUseCase {
  execute(dto: LoginDto): Promise<LoginResult>;
}
