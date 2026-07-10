import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentModel, StudentSchema } from 'src/infrastructure/persistence/student/student.schema';

import { AdmissionController } from './admission.controller';
import { admissionProviders } from './admission.providers';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule,
    MongooseModule.forFeature([
      {
        name: StudentModel.name,
        schema: StudentSchema,
      },
    ]),
  ],
  controllers: [AdmissionController],
  providers: [...admissionProviders],
})
export class AdmissionModule {}
