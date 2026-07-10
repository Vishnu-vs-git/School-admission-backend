import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';

export interface ICompleteRegistrationFeeUseCase {
  execute(studentId: string, parentId: string): Promise<StudentResponseDto>;
}
