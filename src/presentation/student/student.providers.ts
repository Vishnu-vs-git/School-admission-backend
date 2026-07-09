import { CompleteRegistrationFeeUseCase } from 'src/application/use-cases/student/complete-registration-fee.use-case';
import { CreateStudentUseCase } from 'src/application/use-cases/student/create-student.use-case';
import { GetStudentUseCase } from 'src/application/use-cases/student/get-student.use-case';
import { GetStudentsUseCase } from 'src/application/use-cases/student/get-students.usecase';
import { UpdateStudentUseCase } from 'src/application/use-cases/student/update-student.use-case';
import {
  COMPLETE_REGISTRATION_FEE_USE_CASE,
  CREATE_STUDENT_USE_CASE,
  GET_STUDENT_USE_CASE,
  GET_STUDENTS_USE_CASE,
  STUDENT_REPOSITORY,
  UPDATE_STUDENT_USE_CASE,
} from 'src/common/di/injection-token';
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
  {
    provide: UPDATE_STUDENT_USE_CASE,
    useClass: UpdateStudentUseCase,
  },
  {
    provide: GET_STUDENT_USE_CASE,
    useClass: GetStudentUseCase,
  },
  {
    provide: GET_STUDENTS_USE_CASE,
    useClass: GetStudentsUseCase,
  },
  {
    provide: COMPLETE_REGISTRATION_FEE_USE_CASE,
    useClass: CompleteRegistrationFeeUseCase,
  },
];
