import { Gender } from 'src/domain/enums/gender.enum';
import { Grade } from 'src/domain/enums/grade.enum';

export interface UpdateStudentDto {
  studentName: string;
  dateOfBirth: Date;
  gender: Gender;
  previousSchool: string;
  applyingGrade: Grade;
}
