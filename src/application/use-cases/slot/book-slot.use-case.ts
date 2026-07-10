import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';
import { BookExamSlotDto } from 'src/application/dto/exam-slot/book-exam-slot.dto';

import { StudentMapper } from 'src/application/mappers/student.mapper';

import { IBookExamSlotUseCase } from 'src/application/interfaces/use-cases/exam-slot/book-exam-slot.interface';

import { EXAM_SLOT_REPOSITORY, STUDENT_REPOSITORY } from 'src/common/di/injection-token';

import { StudentMessages } from 'src/common/constants/student-messages';

import { ApplicationStatus } from 'src/domain/enums/application-status.enum';

import type { IStudentRepository } from 'src/domain/repositories/interfaces/student.repository';
import type { IExamSlotRepository } from 'src/domain/repositories/interfaces/exam-slot.repository';
import { ValidationMessages } from 'src/common/constants/validation-messages';

@Injectable()
export class BookExamSlotUseCase implements IBookExamSlotUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,

    @Inject(EXAM_SLOT_REPOSITORY)
    private readonly examSlotRepository: IExamSlotRepository,
  ) {}

  async execute(
    studentId: string,
    parentId: string,
    dto: BookExamSlotDto,
  ): Promise<StudentResponseDto> {
    const student = await this.studentRepository.findById(studentId);

    if (!student) {
      throw new NotFoundException(StudentMessages.NOT_FOUND);
    }

    if (student.parentId !== parentId) {
      throw new ForbiddenException(StudentMessages.ACCESS_DENIED);
    }

    if (student.status !== ApplicationStatus.REGISTRATION_FEE_PAID) {
      throw new BadRequestException(StudentMessages.INVALID_STATUS_TRANSITION);
    }

    if (student.examSlotId) {
      throw new BadRequestException(ValidationMessages.EXAM_SLOT_ALREADY_BOOKED);
    }

    const examSlot = await this.examSlotRepository.findById(dto.examSlotId);

    if (!examSlot) {
      throw new NotFoundException(ValidationMessages.EXAM_SLOT_NOT_FOUND);
    }

    if (examSlot.isFull()) {
      throw new BadRequestException(ValidationMessages.SLOT_FULL);
    }

    examSlot.bookSeat();

    student.bookExamSlot(examSlot.id!);

    const updatedExamSlot = await this.examSlotRepository.update(examSlot);

    if (!updatedExamSlot) {
      throw new NotFoundException(ValidationMessages.EXAM_SLOT_NOT_FOUND);
    }

    const updatedStudent = await this.studentRepository.update(student);

    if (!updatedStudent) {
      throw new NotFoundException(StudentMessages.NOT_FOUND);
    }

    return StudentMapper.toResponseDto(updatedStudent);
  }
}
