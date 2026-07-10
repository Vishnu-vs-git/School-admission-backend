import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ConfigService } from '@nestjs/config';

import { USER_REPOSITORY, PASSWORD_SERVICE } from '../common/di/injection-token';

import { IUserRepository } from '../domain/repositories/interfaces/user.repository';
import { IPasswordService } from '../application/interfaces/services/password.service.interface';

import { User } from '../domain/entities/user.entity';
import { Role } from '../domain/enums/role.enum';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userRepository = app.get<IUserRepository>(USER_REPOSITORY);
  const passwordService = app.get<IPasswordService>(PASSWORD_SERVICE);

  const existingUser = await userRepository.findByEmail('admission@test.com');

  if (existingUser) {
    console.log('Admission user already exists.');
    await app.close();
    return;
  }

  const hashedPassword = await passwordService.hash('Password@123');

  const admissionUser = new User({
    name: 'Admission Team',
    email: 'admission@test.com',
    password: hashedPassword,
    role: Role.ADMISSION,
  });

  await userRepository.create(admissionUser);

  console.log('Admission user created successfully.');

  await app.close();
}

void bootstrap();
