import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ExamSlotDocument = HydratedDocument<ExamSlotModel>;

@Schema({
  collection: 'exam_slots',
  timestamps: true,
})
export class ExamSlotModel {
  @Prop({
    type: Date,
    required: true,
  })
  date!: Date;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  time!: string;

  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  totalSeats!: number;

  @Prop({
    type: Number,
    default: 0,
    min: 0,
  })
  bookedSeats!: number;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface IExamSlotDocument extends HydratedDocument<ExamSlotModel> {
  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ExamSlotSchema = SchemaFactory.createForClass(ExamSlotModel);

ExamSlotSchema.index({ date: 1 });
ExamSlotSchema.index({ bookedSeats: 1, totalSeats: 1 });
