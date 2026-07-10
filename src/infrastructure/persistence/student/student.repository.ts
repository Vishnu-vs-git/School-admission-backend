import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Student } from 'src/domain/entities/student.entity';
import { IStudentRepository } from 'src/domain/repositories/interfaces/student.repository';

import { StudentDocument, StudentModel } from './student.schema';

import { StudentFactory } from './student.factory';

@Injectable()
export class StudentRepository implements IStudentRepository {
  constructor(
    @InjectModel(StudentModel.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}

  async create(student: Student): Promise<Student> {
    const createdStudent = await this.studentModel.create(student);

    return StudentFactory.toDomain(createdStudent);
  }

  async update(student: Student): Promise<Student | null> {
    const document = await this.studentModel.findByIdAndUpdate(student.id, student, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return null;
    }

    return StudentFactory.toDomain(document);
  }

  async findById(id: string): Promise<Student | null> {
    const document = await this.studentModel.findById(id);

    if (!document) {
      return null;
    }

    return StudentFactory.toDomain(document);
  }

  async findByParentId(parentId: string): Promise<Student[]> {
    const documents = await this.studentModel.find({ parentId });

    return StudentFactory.toDomainList(documents);
  }

  async findAll(): Promise<Student[]> {
    const documents = await this.studentModel.find();

    return StudentFactory.toDomainList(documents);
  }
}
