import { Gender } from 'src/domain/enums/gender.enum';
import { Grade } from 'src/domain/enums/grade.enum';

export interface CreateStudentDto {
  studentName: string;
  dateOfBirth: Date;
  gender: Gender;
  previousSchool: string;
  applyingGrade: Grade;
}
