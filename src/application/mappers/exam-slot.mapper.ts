import { ExamSlot } from 'src/domain/entities/exam-slot.entity';
import { ICreateExamSlotDto } from '../dto/exam-slot/create-exam-slot.dto';
import { IExamSlotResponseDto } from '../dto/exam-slot/exam-slot-response.dto';

export class ExamSlotMapper {
  static toDomain(dto: ICreateExamSlotDto): ExamSlot {
    return new ExamSlot({
      date: dto.date,
      time: dto.time,
      totalSeats: dto.totalSeats,
      bookedSeats: 0,
    });
  }

  static toResponseDto(slot: ExamSlot): IExamSlotResponseDto {
    return {
      id: slot.id!,
      date: slot.date,
      time: slot.time,
      totalSeats: slot.totalSeats,
      bookedSeats: slot.bookedSeats,
      createdAt: slot.createdAt!,
      updatedAt: slot.updatedAt!,
    };
  }

  static toResponseDtoList(slots: ExamSlot[]): IExamSlotResponseDto[] {
    return slots.map((slot) => this.toResponseDto(slot));
  }
}
