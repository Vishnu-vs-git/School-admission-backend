import { ApplicationStatus } from '../enums/application-status.enum';
import { Gender } from '../enums/gender.enum';
import { Grade } from '../enums/grade.enum';

export class Student {
  public readonly id?: string;
  public readonly parentId: string;

  public studentName: string;
  public dateOfBirth: Date;
  public gender: Gender;
  public previousSchool: string;
  public applyingGrade: Grade;
  public status: ApplicationStatus;

  public examSlotId?: string;
  public examScore?: number;
  public assignedCourse?: Grade;

  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: {
    id?: string;
    parentId: string;
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
  }) {
    this.id = props.id;
    this.parentId = props.parentId;
    this.studentName = props.studentName;
    this.dateOfBirth = props.dateOfBirth;
    this.gender = props.gender;
    this.previousSchool = props.previousSchool;
    this.applyingGrade = props.applyingGrade;
    this.status = props.status;
    this.examSlotId = props.examSlotId;
    this.examScore = props.examScore;
    this.assignedCourse = props.assignedCourse;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
  public updateDetails(props: {
    studentName: string;
    dateOfBirth: Date;
    gender: Gender;
    previousSchool: string;
    applyingGrade: Grade;
  }): void {
    this.studentName = props.studentName;
    this.dateOfBirth = props.dateOfBirth;
    this.gender = props.gender;
    this.previousSchool = props.previousSchool;
    this.applyingGrade = props.applyingGrade;
  }
  public bookExamSlot(examSlotId: string): void {
    this.examSlotId = examSlotId;
    this.status = ApplicationStatus.SLOT_BOOKED;
  }
  public assignCourse(course: Grade): void {
    this.assignedCourse = course;
    this.status = ApplicationStatus.ADMISSION_COMPLETED;
  }
  public updateExamScore(score: number): void {
    this.examScore = score;
    this.status = ApplicationStatus.EXAM_COMPLETED;
  }
  public completeRegistrationFee(): void {
    this.status = ApplicationStatus.REGISTRATION_FEE_PAID;
  }
}
