import { Inject, Injectable } from '@nestjs/common';
import { IExamSlotResponseDto } from 'src/application/dto/exam-slot/exam-slot-response.dto';

import { IGetAvailableExamSlotsUseCase } from 'src/application/interfaces/use-cases/exam-slot/get-available-exam-slots.interface';
import { ExamSlotMapper } from 'src/application/mappers/exam-slot.mapper';

import { EXAM_SLOT_REPOSITORY } from 'src/common/di/injection-token';

import type { IExamSlotRepository } from 'src/domain/repositories/interfaces/exam-slot.repository';

@Injectable()
export class GetAvailableExamSlotsUseCase implements IGetAvailableExamSlotsUseCase {
  constructor(
    @Inject(EXAM_SLOT_REPOSITORY)
    private readonly examSlotRepository: IExamSlotRepository,
  ) {}

  async execute(): Promise<IExamSlotResponseDto[]> {
    const examSlots = await this.examSlotRepository.findAvailableSlots();

    return ExamSlotMapper.toResponseDtoList(examSlots);
  }
}
