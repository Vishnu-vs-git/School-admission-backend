import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';

export interface IGetStudentUseCase {
  execute(studentId: string, parentId: string): Promise<StudentResponseDto>;
}
