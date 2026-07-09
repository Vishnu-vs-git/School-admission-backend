import { BookExamSlotUseCase } from 'src/application/use-cases/slot/book-slot.use-case';
import { CreateExamSlotUseCase } from 'src/application/use-cases/slot/create-slot.use-case';
import { GetAvailableExamSlotsUseCase } from 'src/application/use-cases/slot/get-available-exam-slots.use-case';
import {
  BOOK_EXAM_SLOT_USE_CASE,
  CREATE_EXAM_SLOT_USE_CASE,
  EXAM_SLOT_REPOSITORY,
  GET_AVAILABLE_EXAM_SLOTS_USE_CASE,
} from 'src/common/di/injection-token';
import { ExamSlotRepository } from 'src/infrastructure/persistence/exam-slot/exam-slot.repository.impl';

export const examSlotProviders = [
  {
    provide: EXAM_SLOT_REPOSITORY,
    useClass: ExamSlotRepository,
  },
  {
    provide: CREATE_EXAM_SLOT_USE_CASE,
    useClass: CreateExamSlotUseCase,
  },
  {
    provide: GET_AVAILABLE_EXAM_SLOTS_USE_CASE,
    useClass: GetAvailableExamSlotsUseCase,
  },
  {
    provide: BOOK_EXAM_SLOT_USE_CASE,
    useClass: BookExamSlotUseCase,
  },
];
