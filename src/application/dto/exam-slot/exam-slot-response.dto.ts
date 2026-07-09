export interface ExamSlotResponseDto {
  id: string;
  date: Date;
  time: string;
  totalSeats: number;
  bookedSeats: number;
  createdAt: Date;
  updatedAt: Date;
}
