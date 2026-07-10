import { CreateStudentDto } from 'src/application/dto/student/create-student.dto';
import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';

export interface ICreateStudentUseCase {
  execute(parentId: string, dto: CreateStudentDto): Promise<StudentResponseDto>;
}
