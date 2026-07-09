import { UserResponseDto } from 'src/application/dto/auth/user-response.dto';

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: UserResponseDto;
}
