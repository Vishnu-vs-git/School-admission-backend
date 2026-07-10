import { IUpdateExamScoreDto } from 'src/application/dto/admission/update-exam-score.dto';
import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';

export interface IUpdateExamScoreUseCase {
  execute(studentId: string, dto: IUpdateExamScoreDto): Promise<StudentResponseDto>;
}
