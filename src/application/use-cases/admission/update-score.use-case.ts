import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { StudentMapper } from 'src/application/mappers/student.mapper';
import { StudentResponseDto } from 'src/application/dto/student/student-response.dto';
import { IUpdateExamScoreUseCase } from 'src/application/interfaces/use-cases/admission/update-exam-score.interface';

import { STUDENT_REPOSITORY } from 'src/common/di/injection-token';

import { StudentMessages } from 'src/common/constants/student-messages';

import { ApplicationStatus } from 'src/domain/enums/application-status.enum';
import type { IStudentRepository } from 'src/domain/repositories/interfaces/student.repository';
import { IUpdateExamScoreDto } from 'src/application/dto/admission/update-exam-score.dto';

@Injectable()
export class UpdateExamScoreUseCase implements IUpdateExamScoreUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async execute(studentId: string, dto: IUpdateExamScoreDto): Promise<StudentResponseDto> {
    const student = await this.studentRepository.findById(studentId);

    if (!student) {
      throw new NotFoundException(StudentMessages.NOT_FOUND);
    }

    if (student.status !== ApplicationStatus.SLOT_BOOKED) {
      throw new BadRequestException(StudentMessages.INVALID_STATUS_TRANSITION);
    }

    student.updateExamScore(dto.examScore);

    const updatedStudent = await this.studentRepository.update(student);

    if (!updatedStudent) {
      throw new NotFoundException(StudentMessages.NOT_FOUND);
    }

    return StudentMapper.toResponseDto(updatedStudent);
  }
}
