import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaFactory } from 'src/infrastructure/persistence/user/user.schema';
import { authProviders } from './auth.providers';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule,
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: UserSchemaFactory,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [...authProviders],
})
export class AuthModule {}
