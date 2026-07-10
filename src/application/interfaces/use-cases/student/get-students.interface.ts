import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';

export interface IGetStudentsUseCase {
  execute(parentId: string): Promise<StudentResponseDto[]>;
}
