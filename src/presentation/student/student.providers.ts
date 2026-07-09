import { CreateStudentUseCase } from 'src/application/use-cases/student/create-student.use-case';
import { CREATE_STUDENT_USE_CASE, STUDENT_REPOSITORY } from 'src/common/di/injection-token';
import { StudentRepository } from 'src/infrastructure/persistence/student/student.repository';

export const studentProviders = [
  {
    provide: STUDENT_REPOSITORY,
    useClass: StudentRepository,
  },
  {
    provide: CREATE_STUDENT_USE_CASE,
    useClass: CreateStudentUseCase,
  },
];
