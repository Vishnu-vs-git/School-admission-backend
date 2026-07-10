import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ExamSlotModel,
  ExamSlotSchema,
} from 'src/infrastructure/persistence/exam-slot/exam-slot.schema';
import { ExamSlotController } from './slot.controller';
import { examSlotProviders } from './slot.providers';
import { StudentModel, StudentSchema } from 'src/infrastructure/persistence/student/student.schema';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule,
    MongooseModule.forFeature([
      {
        name: ExamSlotModel.name,
        schema: ExamSlotSchema,
      },
      {
        name: StudentModel.name,
        schema: StudentSchema,
      },
    ]),
  ],
  controllers: [ExamSlotController],
  providers: [...examSlotProviders],
})
export class ExamSlotModule {}
