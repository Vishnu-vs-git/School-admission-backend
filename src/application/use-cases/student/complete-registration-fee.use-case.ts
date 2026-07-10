import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';
import { ICompleteRegistrationFeeUseCase } from 'src/application/interfaces/use-cases/student/complete-registration-fee.interface';
import { StudentMapper } from 'src/application/mappers/student.mapper';

import { StudentMessages } from 'src/common/constants/student-messages';
import { STUDENT_REPOSITORY } from 'src/common/di/injection-token';

import { ApplicationStatus } from 'src/domain/enums/application-status.enum';
import type { IStudentRepository } from 'src/domain/repositories/interfaces/student.repository';

@Injectable()
export class CompleteRegistrationFeeUseCase implements ICompleteRegistrationFeeUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(studentId: string, parentId: string): Promise<StudentResponseDto> {
    const student = await this.studentRepository.findById(studentId);

    if (!student) {
      throw new NotFoundException(StudentMessages.NOT_FOUND);
    }

    if (student.parentId !== parentId) {
      throw new ForbiddenException(StudentMessages.ACCESS_DENIED);
    }

    if (student.status === ApplicationStatus.REGISTRATION_FEE_PAID) {
      throw new BadRequestException(StudentMessages.PAYMENT_ALREADY_COMPLETED);
    }

    if (student.status !== ApplicationStatus.APPLICATION_CREATED) {
      throw new BadRequestException(StudentMessages.INVALID_STATUS_TRANSITION);
    }

    student.status = ApplicationStatus.REGISTRATION_FEE_PAID;

    const updatedStudent = await this.studentRepository.update(student);

    if (!updatedStudent) {
      throw new NotFoundException(StudentMessages.NOT_FOUND);
    }

    return StudentMapper.toResponseDto(updatedStudent);
  }
}
