import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

import { ApplicationStatus } from 'src/domain/enums/application-status.enum';
import { Gender } from 'src/domain/enums/gender.enum';
import { Grade } from 'src/domain/enums/grade.enum';

export type StudentDocument = HydratedDocument<StudentModel>;

@Schema({
  collection: 'students',
  timestamps: true,
})
export class StudentModel {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  parentId!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  studentName!: string;

  @Prop({
    type: Date,
    required: true,
  })
  dateOfBirth!: Date;

  @Prop({
    type: String,
    enum: Object.values(Gender),
    required: true,
  })
  gender!: Gender;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  previousSchool!: string;

  @Prop({
    type: String,
    enum: Object.values(Grade),
    required: true,
  })
  applyingGrade!: Grade;

  @Prop({
    type: String,
    enum: Object.values(ApplicationStatus),
    required: true,
  })
  status!: ApplicationStatus;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ExamSlot',
  })
  examSlotId?: Types.ObjectId;

  @Prop({
    type: Number,
    min: 0,
    max: 100,
  })
  examScore?: number;

  @Prop({
    type: String,
    enum: Object.values(Grade),
  })
  assignedCourse?: Grade;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface IStudentDocument extends HydratedDocument<StudentModel> {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const StudentSchema = SchemaFactory.createForClass(StudentModel);

StudentSchema.index({ parentId: 1 });
StudentSchema.index({ status: 1 });
