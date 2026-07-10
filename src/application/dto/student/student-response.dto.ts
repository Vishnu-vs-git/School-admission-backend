import { ApplicationStatus } from 'src/domain/enums/application-status.enum';
import { Gender } from 'src/domain/enums/gender.enum';
import { Grade } from 'src/domain/enums/grade.enum';

export interface StudentResponseDto {
  id: string;
  studentName: string;
  dateOfBirth: Date;
  gender: Gender;
  previousSchool: string;
  applyingGrade: Grade;

  status: ApplicationStatus;

  examSlotId?: string;

  examScore?: number;

  assignedCourse?: Grade;


  createdAt?: Date;

  updatedAt?: Date;
}
