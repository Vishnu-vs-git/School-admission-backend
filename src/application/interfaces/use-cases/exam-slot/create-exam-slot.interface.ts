import { ICreateExamSlotDto } from 'src/application/dto/exam-slot/create-exam-slot.dto';
import { IExamSlotResponseDto } from 'src/application/dto/exam-slot/exam-slot-response.dto';

export interface ICreateExamSlotUseCase {
  execute(dto: ICreateExamSlotDto): Promise<IExamSlotResponseDto>;
}
