import { IExamSlotResponseDto } from 'src/application/dto/exam-slot/exam-slot-response.dto';

export interface IGetAvailableExamSlotsUseCase {
  execute(): Promise<IExamSlotResponseDto[]>;
}
