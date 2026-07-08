import { ApplicationStatus } from '../enums/application-status.enum';
import { Gender } from '../enums/gender.enum';

interface StudentProps {
  id?: string;
  parentId: string;
  studentName: string;
  dateOfBirth: Date;
  gender: Gender;
  previousSchool: string;
  applyingGrade: string;
  status: ApplicationStatus;
  registrationPaid: boolean;
  examSlotId?: string;
  examScore?: number;
  assignedCourse?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Student {
  id?: string;
  parentId: string;
  studentName: string;
  dateOfBirth: Date;
  gender: Gender;
  previousSchool: string;
  applyingGrade: string;
  status: ApplicationStatus;
  registrationPaid: boolean;
  examSlotId?: string;
  examScore?: number;
  assignedCourse?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: StudentProps) {
    this.id = props.id;
    this.parentId = props.parentId;
    this.studentName = props.studentName;
    this.dateOfBirth = props.dateOfBirth;
    this.gender = props.gender;
    this.previousSchool = props.previousSchool;
    this.applyingGrade = props.applyingGrade;
    this.status = props.status;
    this.registrationPaid = props.registrationPaid;
    this.examSlotId = props.examSlotId;
    this.examScore = props.examScore;
    this.assignedCourse = props.assignedCourse;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
