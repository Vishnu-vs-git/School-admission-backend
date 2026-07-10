import { IAssignCourseDto } from 'src/application/dto/admission/assign-course.dto';
import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';

export interface IAssignCourseUseCase {
  execute(studentId: string, dto: IAssignCourseDto): Promise<StudentResponseDto>;
}
