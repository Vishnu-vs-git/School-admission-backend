import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { IPasswordService } from '../../../application/interfaces/services/password.service.interface';

@Injectable()
export class BcryptPasswordService implements IPasswordService {
  private readonly SALT_ROUNDS = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
