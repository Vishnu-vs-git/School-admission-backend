import { ExamSlot } from "src/domain/entities/exam-slot.entity";


export interface IExamSlotRepository {
  create(slot: ExamSlot): Promise<ExamSlot>;

  findAll(): Promise<ExamSlot[]>;

  findById(id: string): Promise<ExamSlot | null>;

  update(slot: ExamSlot): Promise<ExamSlot>;
}