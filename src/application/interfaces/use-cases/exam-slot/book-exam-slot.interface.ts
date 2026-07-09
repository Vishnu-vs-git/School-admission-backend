import { BookExamSlotDto } from 'src/application/dto/exam-slot/book-exam-slot.dto';
import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';

export interface IBookExamSlotUseCase {
  execute(studentId: string, parentId: string, dto: BookExamSlotDto): Promise<StudentResponseDto>;
}
