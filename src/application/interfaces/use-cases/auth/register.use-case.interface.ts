import { RegisterDto } from 'src/application/dto/auth/register.dto';
import { UserResponseDto } from 'src/application/dto/auth/user-response.dto';

export interface IRegisterUseCase {
  execute(dto: RegisterDto): Promise<UserResponseDto>;
}
