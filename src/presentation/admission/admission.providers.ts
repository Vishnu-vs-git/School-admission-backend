import { AssignCourseUseCase } from 'src/application/use-cases/admission/assign-course.use-case';
import { UpdateExamScoreUseCase } from 'src/application/use-cases/admission/update-score.use-case';
import {
  ASSIGN_COURSE_USE_CASE,
  STUDENT_REPOSITORY,
  UPDATE_EXAM_SCORE_USE_CASE,
} from 'src/common/di/injection-token';
import { StudentRepository } from 'src/infrastructure/persistence/student/student.repository';

export const admissionProviders = [
  {
    provide: UPDATE_EXAM_SCORE_USE_CASE,
    useClass: UpdateExamScoreUseCase,
  },
  {
    provide: ASSIGN_COURSE_USE_CASE,
    useClass: AssignCourseUseCase,
  },
  {
    provide: STUDENT_REPOSITORY,
    useClass: StudentRepository,
  },
];
