import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ExamSlot } from 'src/domain/entities/exam-slot.entity';
import { IExamSlotRepository } from 'src/domain/repositories/interfaces/exam-slot.repository';

import { ExamSlotDocument, ExamSlotModel } from './exam-slot.schema';
import { ExamSlotFactory } from './exam-slot.factory';

@Injectable()
export class ExamSlotRepository implements IExamSlotRepository {
  constructor(
    @InjectModel(ExamSlotModel.name)
    private readonly examSlotModel: Model<ExamSlotDocument>,
  ) {}

  async create(slot: ExamSlot): Promise<ExamSlot> {
    const createdSlot = await this.examSlotModel.create(slot);

    return ExamSlotFactory.toDomain(createdSlot);
  }

  async update(slot: ExamSlot): Promise<ExamSlot | null> {
    const document = await this.examSlotModel.findByIdAndUpdate(slot.id, slot, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return null;
    }

    return ExamSlotFactory.toDomain(document);
  }

  async findById(id: string): Promise<ExamSlot | null> {
    const document = await this.examSlotModel.findById(id);

    if (!document) {
      return null;
    }

    return ExamSlotFactory.toDomain(document);
  }

  async findAvailableSlots(): Promise<ExamSlot[]> {
    const documents = await this.examSlotModel.find({
      $expr: {
        $lt: ['$bookedSeats', '$totalSeats'],
      },
    });

    return ExamSlotFactory.toDomainList(documents);
  }

  async findAll(): Promise<ExamSlot[]> {
    const documents = await this.examSlotModel.find();

    return ExamSlotFactory.toDomainList(documents);
  }
}
