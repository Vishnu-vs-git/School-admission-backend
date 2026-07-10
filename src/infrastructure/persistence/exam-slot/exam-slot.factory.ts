import { ExamSlot } from 'src/domain/entities/exam-slot.entity';
import { IExamSlotDocument } from './exam-slot.schema';

export class ExamSlotFactory {
  static toDomain(document: IExamSlotDocument): ExamSlot {
    return new ExamSlot({
      id: document._id.toString(),
      date: document.date,
      time: document.time,
      totalSeats: document.totalSeats,
      bookedSeats: document.bookedSeats,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static toDomainList(documents: IExamSlotDocument[]): ExamSlot[] {
    return documents.map((document) => this.toDomain(document));
  }
}
