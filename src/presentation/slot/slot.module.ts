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

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule,
    MongooseModule.forFeature([
      {
        name: ExamSlotModel.name,
        schema: ExamSlotSchema,
      },
    ]),
  ],
  controllers: [ExamSlotController],
  providers: [...examSlotProviders],
})
export class ExamSlotModule {}
