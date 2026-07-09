import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';
import { UpdateStudentDto } from 'src/application/dto/student/update-student.dto';

export interface IUpdateStudentUseCase {
  execute(studentId: string, parentId: string, dto: UpdateStudentDto): Promise<StudentResponseDto>;
}
