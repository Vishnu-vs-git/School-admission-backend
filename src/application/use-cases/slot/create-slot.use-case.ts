import { Inject, Injectable } from '@nestjs/common';
import { ICreateExamSlotDto } from 'src/application/dto/exam-slot/create-exam-slot.dto';
import { IExamSlotResponseDto } from 'src/application/dto/exam-slot/exam-slot-response.dto';

import { ICreateExamSlotUseCase } from 'src/application/interfaces/use-cases/exam-slot/create-exam-slot.interface';
import { ExamSlotMapper } from 'src/application/mappers/exam-slot.mapper';

import { EXAM_SLOT_REPOSITORY } from 'src/common/di/injection-token';

import type { IExamSlotRepository } from 'src/domain/repositories/interfaces/exam-slot.repository';

@Injectable()
export class CreateExamSlotUseCase implements ICreateExamSlotUseCase {
  constructor(
    @Inject(EXAM_SLOT_REPOSITORY)
    private readonly examSlotRepository: IExamSlotRepository,
  ) {}

  async execute(dto: ICreateExamSlotDto): Promise<IExamSlotResponseDto> {
    const examSlot = ExamSlotMapper.toDomain(dto);

    const createdExamSlot = await this.examSlotRepository.create(examSlot);

    return ExamSlotMapper.toResponseDto(createdExamSlot);
  }
}
